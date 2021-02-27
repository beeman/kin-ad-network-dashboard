import { createSelector } from 'reselect';
import State from '../state';

const userSelector = (state: Pick<State, 'user'>) => state.user;

export const getIsLoggedIn = createSelector(
    userSelector,
    ({ isLoggedIn }) => isLoggedIn,
);

export const getUserId = createSelector(
    userSelector,
    ({ userId }) => userId,
);

export const getErrorMessage = createSelector(
    userSelector,
    ({ errorMessage }) => errorMessage,
);

export const getUserGroup = createSelector(
    userSelector,
    ({ group }) => group,
);

export const getLoginSubmitting = createSelector(
    userSelector,
    ({ loginSubmitting }) => loginSubmitting,
);

export const getResetPasswordSubmitting = createSelector(
    userSelector,
    ({ resetPasswordSubmitting }) => resetPasswordSubmitting,
);

export const getResetPasswordError = createSelector(
    userSelector,
    ({ resetPasswordErrorMessage }) => resetPasswordErrorMessage,
);

export const getForgotPasswordSubmitting = createSelector(
    userSelector,
    ({ forgotPasswordSubmitting }) => forgotPasswordSubmitting,
);

export const getForgotPasswordError = createSelector(
    userSelector,
    ({ forgotPasswordErrorMessage }) => forgotPasswordErrorMessage,
);

export const getForgotPasswordResetSubmitting = createSelector(
    userSelector,
    ({ forgotPasswordResetSubmitting }) => forgotPasswordResetSubmitting,
);

export const getForgotPasswordResetErrorMessage = createSelector(
    userSelector,
    ({ forgotPasswordResetErrorMessage }) => forgotPasswordResetErrorMessage,
);
