import {
    takeEvery, call, put, select,
} from 'redux-saga/effects';
import merge from 'deepmerge';
import { DynamoDB } from 'aws-sdk';
import { Auth } from 'aws-amplify';
import moment from 'moment';

import { GET, GetReporting, setReporting } from '../actions/reporting';
import { getAppsByUserId } from '../selectors/app';
import { listUsers } from './app';
import { getUserGroup, getUserId } from '../selectors/user';

interface ReportingItem {
    userId: string;
    dateMedationId: string;
    impressions: number;
    revenue: number;
    clicks: number;
    appFillRate: number;
}

function* getAppList() {
    let apps = yield select(getAppsByUserId);
    if (Object.keys(apps).length === 0) {
        const group = yield select(getUserGroup);
        if (group === 'AdminGroup') {
            yield call(listUsers);
            apps = yield select(getAppsByUserId);
        } else if (group === 'UserGroup') {
            const userId = yield select(getUserId);
            apps = { [userId]: 'myusername' };
        }
    }
    return apps;
}

const getUserReport = async (credentials: any, userId: string, date: string) => {
    const client = new DynamoDB.DocumentClient({
        region: process.env.REACT_APP_REGION!,
        ...credentials,
    });

    const { Items } = await client.query({
        TableName: `${process.env.REACT_APP_STAGE}-app-reports`,
        ExpressionAttributeNames: { '#userId': 'userId', '#dateMedationId': 'dateMedationId' },
        ExpressionAttributeValues: {
            ':userId': userId,
            ':dateMedationId': date,
        },
        KeyConditionExpression: '#userId = :userId AND begins_with(#dateMedationId, :dateMedationId)',
    }).promise();
    return Items;
};

function* getReporting({ payload }: GetReporting) {
    const apps = yield call(getAppList);
    const credentials = yield Auth.currentUserCredentials();

    const dates = [];
    for (let i = 0; i < payload.numberOfDays; i += 1) {
        dates.push(moment(payload.startDate).add(i, 'days').format('YYYYMMDD'));
    }

    const Items: ReportingItem[][] = yield Promise.all(
        dates.map(
            (date) => Object.keys(apps).map((userId) => getUserReport(credentials, userId, date)),
        ).flat(),
    );

    const data = Items
        .map((appResults: ReportingItem[]) => appResults.map((item) => ({
            date: item.dateMedationId.split('#')[0],
            network: item.dateMedationId.split('#')[1],
            mediationId: item.dateMedationId.split('#')[2],
            appFillRate: item.appFillRate,
            clicks: item.clicks,
            impressions: item.impressions,
            revenue: item.revenue,
            username: apps[item.userId],
        })))
        .reduce((acc, val) => {
            val.forEach((valRes) => {
                // eslint-disable-next-line no-param-reassign
                acc = merge(
                    acc,
                    { [valRes.date]: { [valRes.username]: { [`${valRes.network}#${valRes.mediationId}`]: valRes } } },
                );
            });

            return acc;
        }, {} as Record<string, Record<string, string|number>>);

    yield put(setReporting(data));
}

export default function* () {
    yield takeEvery(GET, getReporting);
}
