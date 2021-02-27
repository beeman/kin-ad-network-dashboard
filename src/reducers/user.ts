import * as userActions from '../actions/user';
import State from '../state';

const initialState: State['user'] = {
    errorMessage: undefined,
    isLoggedIn: false,
    userId: undefined,
    group: undefined,

    loginSubmitting: false,

    forgotPasswordErrorMessage: undefined,
    forgotPasswordSubmitting: false,

    forgotPasswordResetSubmitting: false,
    forgotPasswordResetErrorMessage: undefined,

    resetPasswordErrorMessage: undefined,
    resetPasswordSubmitting: false,
};

const userReducer = (state = initialState, action: any): State['user'] => {
    switch (action.type) {
        case userActions.LOGIN: {
            return {
                ...state,
                loginSubmitting: true,
            };
        }
        case userActions.SET_USER: {
            const { payload } = action as userActions.SetUser;
            return {
                ...state,
                errorMessage: undefined,
                loginSubmitting: false,
                userId: payload.userId,
                group: payload.group,
            };
        }
        case userActions.REMOVE_USER_ID: {
            return {
                ...state,
                userId: undefined,
            };
        }
        case userActions.LOGIN_ERROR: {
            const { payload } = action as userActions.LoginError;
            return {
                ...state,
                errorMessage: payload.message,
                loginSubmitting: false,
            };
        }
        case userActions.RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                resetPasswordSubmitting: true,
            };
        }
        case userActions.RESET_PASSWORD_ERROR: {
            const { payload } = action as userActions.ResetPasswordError;
            return {
                ...state,
                resetPasswordErrorMessage: payload.message,
                resetPasswordSubmitting: false,
            };
        }
        case userActions.RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetPasswordErrorMessage: undefined,
                resetPasswordSubmitting: false,
            };
        }
        case userActions.FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
                forgotPasswordSubmitting: true,
            };
        }
        case userActions.FORGOT_PASSWORD_REQUEST_ERROR: {
            const { payload } = action as userActions.ForgotPasswordRequestError;
            return {
                ...state,
                forgotPasswordErrorMessage: payload.message,
                forgotPasswordSubmitting: false,
            };
        }
        case userActions.FORGOT_PASSWORD_REQUEST_SENT: {
            return {
                ...state,
                forgotPasswordErrorMessage: undefined,
                forgotPasswordSubmitting: false,
            };
        }
        case userActions.FORGOT_PASSWORD_RESET: {
            return {
                ...state,
                forgotPasswordResetSubmitting: true,
            };
        }
        case userActions.FORGOT_PASSWORD_RESET_ERROR: {
            const { payload } = action as userActions.ForgotPasswordResetError;
            return {
                ...state,
                forgotPasswordResetSubmitting: false,
                forgotPasswordResetErrorMessage: payload.message,
            };
        }
        case userActions.FORGOT_PASSWORD_RESET_SUCCESS: {
            return {
                ...state,
                forgotPasswordResetSubmitting: false,
                forgotPasswordResetErrorMessage: undefined,
            };
        }
        default:
            return state;
    }
};

export default userReducer;
