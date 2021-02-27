import {
    takeEvery, call, put, select,
} from 'redux-saga/effects';
import {
    GET, Get, set, GET_BY_DATE, GetByDate,
} from '../actions/payouts';
import { AppInfo } from '../state';
import { query } from '../helpers/ddb';
import { Payout } from '../types';
import { getUserId } from '../selectors/user';

function* getPayouts({ payload }: Get) {
    let userId;

    if (payload.username === 'me') {
        userId = yield select(getUserId);
    } else {
        const [user]: AppInfo[] = yield call(query, 'apps', { dataIdx: `username#${payload.username}` }, 'dataIndex');
        if (!user) {
            return;
        }

        userId = user.userId;
    }

    // Get all entries and save in userId stuff
    const payouts: Payout[] = yield call(query, 'payouts', { userId });
    yield put(set(payouts));
}

function* getPayoutsByDate({ payload }: GetByDate) {
    // Get all entries and save in userId stuff
    const payouts: Payout[] = yield call(query, 'payouts', { date: payload.date }, 'dateIndex');
    yield put(set(payouts));
}

function* app() {
    yield takeEvery(GET, getPayouts);
    yield takeEvery(GET_BY_DATE, getPayoutsByDate);
}

export default app;
