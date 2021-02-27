import {
    all,
    call,
    put,
    take,
} from 'redux-saga/effects';
import { Auth } from 'aws-amplify';
import * as userActions from '../actions/user';
import { initComplete } from '../actions/init';
import { set } from '../actions/hotWallet';
import { LOAD } from '../actions/language';

function* initializeSession() {
    const user = yield call([Auth, 'currentUserInfo']);
    if (user) {
        const userAccount = yield call([Auth, 'currentAuthenticatedUser'], { bypassCache: true });
        const group = userAccount.signInUserSession.idToken.payload['cognito:groups'][0] as string;
        yield put(userActions.setUser(user.id, group));
    }
}

function* getHotWalletStatus() {
    const hotWalletRawResult = yield call(fetch, `${process.env.REACT_APP_BACKEND_HOST}/hot_wallet_status`);
    const hotWallet = yield call([hotWalletRawResult, 'json']);
    yield put(set(hotWallet));
}

export default function* () {
    yield all([
        call(initializeSession),
        call(getHotWalletStatus),

        // Wait for other sagas that need to init
        take(LOAD),
    ]);

    yield put(initComplete());
}
