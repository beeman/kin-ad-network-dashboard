import { all, fork, take } from 'redux-saga/effects';
import { Auth } from 'aws-amplify';
import { auth } from '../config';

import init from './init';
import user from './user';
import app from './app';
import reporting from './reporting';
import language from './language';
import payouts from './payouts';

import { INIT_COMPLETE } from '../actions/init';

Auth.configure(auth);

export default function* () {
    yield fork(init);
    yield fork(language);

    yield take(INIT_COMPLETE);

    yield all([
        fork(user),
        fork(app),
        fork(reporting),
        fork(payouts),
    ]);
}
