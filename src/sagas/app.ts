import { CognitoIdentityServiceProvider, CognitoIdentity } from 'aws-sdk';
import {
    takeEvery,
    put,
    call,
    cps,
    select,
    all,
    takeLatest,
} from 'redux-saga/effects';
import { toast } from 'react-semantic-toasts';
import { push } from 'connected-react-router';
import { Auth } from 'aws-amplify';

import {
    CREATE,
    Create,
    createSuccess,
    createFailed,
    LIST,
    listSet,
    Get,
    GET,
    set,
    setEntries,
    DELETE_ENTRY,
    DeleteEntry,
    get,
    CreateEntry,
    createEntrySuccess,
    CREATE_ENTRY,
    SAVE_SETTINGS,
    SaveSettings,
} from '../actions/app';
import { AuthUser, UserQueryResult } from '../types';
import { updateItem, query, deleteItem } from '../helpers/ddb';
import { AppInfo } from '../state';
import { getCurrentApp } from '../selectors/app';
import { getMessage } from '../selectors/locales';

function resolvePasswordChallenge(user: AuthUser, password: string) {
    return new Promise((resolve, reject) => {
        user.completeNewPasswordChallenge(password, {}, {
            onFailure: reject,
            onSuccess: resolve,
        });
    });
}

function* getIdentityId(username: string, password: string) {
    // Sign in as other user
    const user = yield call([Auth, 'signIn'], username, password);
    yield call(resolvePasswordChallenge, user, password);

    // Get identity ID
    const userAccount = yield call([Auth, 'currentSession']);
    const token = userAccount.getIdToken().getJwtToken();
    const getCognitoIdentity = new CognitoIdentity({ region: process.env.REACT_APP_REGION! });
    // @ts-ignore
    const { IdentityId } = yield cps([getCognitoIdentity, 'getId'], {
        AccountId: process.env.REACT_APP_AWS_ACCOUNT_ID!,
        IdentityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID!,
        Logins: { [`cognito-idp.${process.env.REACT_APP_REGION!}.amazonaws.com/${process.env.REACT_APP_USER_POOL_ID!}`]: token },
    });

    return IdentityId;
}

function* getIdentityIdOfNewUser(username: string, password: string) {
    // Get current credentials
    const adminCredentials: Record<string, string> = {};
    Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('CognitoIdentityServiceProvider')) {
            adminCredentials[key] = localStorage.getItem(key)!;
        }
    });

    // Sign in to new user to register as federated identity
    const identityId = yield call(getIdentityId, username, password);

    // Sign in as admin again
    yield call([Auth, 'signOut']);
    Object.entries(adminCredentials).forEach(([key, value]: [string, string]) => {
        localStorage.setItem(key, value);
    });

    return identityId;
}

function* createUser(
    ServiceProvider: CognitoIdentityServiceProvider,
    username: string,
    email: string,
    password: string,
) {
    // Create user
    yield ServiceProvider.adminCreateUser({
        MessageAction: 'SUPPRESS',
        TemporaryPassword: password,
        UserAttributes: [
            { Name: 'email', Value: email },
            { Name: 'email_verified', Value: 'True' },
        ],
        UserPoolId: process.env.REACT_APP_USER_POOL_ID!,
        Username: username,
    }).promise();

    // Add to group
    yield ServiceProvider.adminAddUserToGroup({
        GroupName: 'UserGroup',
        UserPoolId: process.env.REACT_APP_USER_POOL_ID!,
        Username: username,
    }).promise();
}

function* createApp({ payload }: Create) {
    const ServiceProvider = new CognitoIdentityServiceProvider(
        {
            region: process.env.REACT_APP_REGION,
            ...yield call([Auth, 'currentUserCredentials']),
        },
    );

    try {
        // Create user in user pool
        yield call(createUser, ServiceProvider, payload.username, payload.email, payload.password);

        // Sign in in seperate Auth instance to register user as
        // federated identity and fetch that identity ID
        const identityId = yield call(getIdentityIdOfNewUser, payload.username, payload.password);

        // Save username in the apps table
        yield call(updateItem, 'apps', { userId: identityId, dataIdx: `username#${payload.username}` });
    } catch (e) {
        yield put(createFailed('app_create_error'));
        return;
    }

    toast({ title: yield select(getMessage('toast_user_created')), type: 'success' });
    yield put(createSuccess());
    yield put(push('/'));
}

export function* listUsers() {
    const ServiceProvider = new CognitoIdentityServiceProvider(
        {
            region: process.env.REACT_APP_REGION,
            ...yield call([Auth, 'currentUserCredentials']),
        },
    );

    let PaginationToken;
    const items: string[] = [];
    while (PaginationToken != null || items.length === 0) {
        // eslint-disable-next-line max-len
        const users: CognitoIdentityServiceProvider.ListUsersResponse = yield ServiceProvider.listUsers({
            PaginationToken,
            UserPoolId: process.env.REACT_APP_USER_POOL_ID!,
        }).promise();
        PaginationToken = users.PaginationToken || undefined;
        users.Users!.forEach((user) => items.push(user.Username!));
    }
    items.sort((a, b) => a.localeCompare(b));

    // Get userIds
    const userIds: { userId: string }[][] = yield all(items.map((item) => query('apps', { dataIdx: `username#${item}` }, 'dataIndex')));
    const users = items.reduce((acc, val, i) => {
        if (!userIds[i][0]) {
            return acc;
        }
        acc[val] = userIds[i][0].userId;
        return acc;
    }, {} as Record<string, string>);

    yield put(listSet(users));
}

function* getByUsername({ payload }: Get) {
    const [user]: AppInfo[] = yield call(query, 'apps', { dataIdx: `username#${payload.username}` }, 'dataIndex');
    if (!user) {
        return;
    }

    // Get all entries and save in userId stuff
    const userData: UserQueryResult[] = yield call(query, 'apps', { userId: user.userId });
    yield put(setEntries(userData));

    const parsedUser = {
        ...user,
        username: user.dataIdx.replace('username#', ''),
    };

    yield put(set(parsedUser));
}

function* createEntry({ payload }: CreateEntry) {
    const currentApp: ReturnType<typeof getCurrentApp> = yield select(getCurrentApp);
    yield call(
        updateItem,
        'apps',
        {
            userId: currentApp!.userId,
            dataIdx: `${payload.entryType}#${payload.mediationNetwork}#${payload.id}`,
        },
        { name: payload.name, ...payload.extraData },
    );

    toast({ title: yield select(getMessage('toast_entry_updated')), type: 'success' });
    yield put(push(`/app/${currentApp!.username}`));
    yield put(createEntrySuccess());
}

function* deleteEntry({ payload }: DeleteEntry) {
    const currentApp: ReturnType<typeof getCurrentApp> = yield select(getCurrentApp);
    yield call(
        deleteItem,
        'apps',
        {
            userId: currentApp!.userId,
            dataIdx: `${payload.type}#${payload.network}#${payload.id}`,
        },
    );

    toast({ title: yield select(getMessage('toast_entry_deleted')), type: 'success' });
    yield put(get(currentApp!.username));
    yield put(push(`/app/${currentApp!.username}`));
}

function* saveSettings({ payload }: SaveSettings) {
    const currentApp: ReturnType<typeof getCurrentApp> = yield select(getCurrentApp);
    yield call(
        updateItem,
        'apps',
        {
            userId: currentApp!.userId,
            dataIdx: `username#${currentApp!.username}`,
        },
        payload,
    );

    toast({ title: yield select(getMessage('toast_settings_updated')), type: 'success' });
}

function* app() {
    yield takeEvery(CREATE, createApp);
    yield takeEvery(LIST, listUsers);
    yield takeEvery(GET, getByUsername);
    yield takeEvery(CREATE_ENTRY, createEntry);
    yield takeEvery(DELETE_ENTRY, deleteEntry);
    yield takeLatest(SAVE_SETTINGS, saveSettings);
}

export default app;
