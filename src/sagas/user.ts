import {
    call, put, takeEvery, select,
} from 'redux-saga/effects';
import { Auth } from 'aws-amplify';
import { toast } from 'react-semantic-toasts';
import { push } from 'connected-react-router';

import * as userActions from '../actions/user';

import { AuthUser } from '../types';
import { getMessage } from '../selectors/locales';

function resolvePasswordChallenge(user: AuthUser, password: string) {
    return new Promise((resolve, reject) => {
        user.completeNewPasswordChallenge(password, {}, {
            onFailure: reject,
            onSuccess: resolve,
        });
    });
}

function* login({ payload }: userActions.Login) {
    let user: AuthUser;
    try {
        user = yield call([Auth, 'signIn'], payload.username, payload.password);
    } catch (e) {
        yield put(userActions.loginError('error_login'));
        return;
    }

    // Set the password
    if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        yield call(resolvePasswordChallenge, user, payload.password);
    }

    const { id } = yield call([Auth, 'currentUserInfo']);
    const userAccount = yield call([Auth, 'currentAuthenticatedUser'], { bypassCache: true });
    const group = userAccount.signInUserSession.idToken.payload['cognito:groups'][0] as string;
    yield put(userActions.setUser(id, group));
}

function* logout() {
    yield call([Auth, 'signOut']);
    yield put(userActions.removeUserId());
    yield put(push('/'));
}

function* resetPassword({ payload }: userActions.ResetPasswordRequest) {
    if (payload.newPassword !== payload.newPasswordConfirm) {
        yield put(userActions.resetPasswordError('New passwords do not match'));
        return;
    }

    try {
        const currentUser = yield call([Auth, 'currentAuthenticatedUser']);
        yield call([Auth, 'changePassword'], currentUser, payload.oldPassword, payload.newPassword);
    } catch (e) {
        yield put(userActions.resetPasswordError('error_reset_password'));
        return;
    }

    yield put(userActions.resetPasswordSuccess());
    toast({
        title: yield select(getMessage('toast_password_updated')),
        type: 'success',
    });
}

function* forgotPassword({ payload }: userActions.ForgotPasswordRequest) {
    try {
        yield call([Auth, 'forgotPassword'], payload.email);
    } catch (e) {
        yield put(userActions.forgotPasswordRequestError('error_forgot_password'));
        return;
    }

    yield put(userActions.forgotPasswordRequestSent());
    toast({
        title: yield select(getMessage('toast_verification_link')),
        type: 'success',
    });

    // Redirect to new password screen
    yield put(push('/forgot_password_reset'));
}

function* forgotPasswordReset({ payload }: userActions.ForgotPasswordReset) {
    try {
        yield call(
            [Auth, 'forgotPasswordSubmit'],
            payload.username,
            payload.verification,
            payload.newPassword,
        );
    } catch (e) {
        let errorMessage = '';
        switch (e.message) {
            case 'Username cannot be empty':
            case 'Username/client id combination not found.':
                errorMessage = 'error_forgot_password_reset_username';
                break;
            case 'Confirmation code cannot be empty':
            case 'Invalid verification code provided, please try again.':
                errorMessage = 'error_forgot_password_reset_verification';
                break;
            case 'Password cannot be empty':
                errorMessage = 'error_forgot_password_reset_password';
                break;
            default:
                errorMessage = 'error_forgot_password_reset_unknown';
        }
        yield put(userActions.forgotPasswordResetError(errorMessage));
        return;
    }

    yield put(userActions.forgotPasswordResetSuccess());
    toast({
        title: yield select(getMessage('toast_password_reset_success')),
        type: 'success',
    });
    yield put(push('/'));
}

export default function* () {
    yield takeEvery(userActions.LOGIN, login);
    yield takeEvery(userActions.LOGOUT, logout);
    yield takeEvery(userActions.RESET_PASSWORD_REQUEST, resetPassword);
    yield takeEvery(userActions.FORGOT_PASSWORD_REQUEST, forgotPassword);
    yield takeEvery(userActions.FORGOT_PASSWORD_RESET, forgotPasswordReset);
}
