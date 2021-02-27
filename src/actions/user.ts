import { FSA } from 'flux-standard-action';

export const SET_USER = 'USER_SET_USER';
export interface SetUser extends Omit<FSA, 'payload'> {
    payload: { group: string, userId: string; }
}
export const setUser = (userId: string, group: string) => ({
    payload: { group, userId },
    type: SET_USER,
}) as SetUser;
export type SetUserAction = typeof setUser;

export const REMOVE_USER_ID = 'USER_REMOVE_USER_ID';
export type RemoveUserId = FSA;
export const removeUserId = () => ({
    type: REMOVE_USER_ID,
}) as RemoveUserId;
export type RemoveUserIdAction = typeof removeUserId;

export const LOGIN = 'USER_LOGIN';
export interface Login extends Omit<FSA, 'payload'> {
    payload: { username: string; password: string; }
}
export const login = (username: string, password: string) => ({
    payload: { username, password },
    type: LOGIN,
}) as Login;
export type LoginAction = typeof login;

export const LOGIN_ERROR = 'USER_LOGIN_ERROR';
export interface LoginError extends Omit<FSA, 'payload'> {
    payload: { message: string; }
}
export const loginError = (message: string) => ({
    payload: { message },
    type: LOGIN_ERROR,
}) as LoginError;
export type LoginErrorAction = typeof loginError;

export const LOGOUT = 'USER_LOGOUT';
export type Logout = FSA;
export const logout = () => ({
    type: LOGOUT,
}) as Logout;
export type LogoutAction = typeof logout;

export const RESET_PASSWORD_REQUEST = 'USER_RESET_PASSWORD_REQUEST';
export interface ResetPasswordRequest extends Omit<FSA, 'payload'> {
    payload: { oldPassword: string; newPassword: string; newPasswordConfirm: string }
}
export const resetPasswordRequest = (
    oldPassword: string,
    newPassword: string,
    newPasswordConfirm: string,
) => ({
    payload: { oldPassword, newPassword, newPasswordConfirm },
    type: RESET_PASSWORD_REQUEST,
}) as ResetPasswordRequest;
export type ResetPasswordRequestAction = typeof resetPasswordRequest;

export const RESET_PASSWORD_ERROR = 'USER_RESET_PASSWORD_ERROR';
export interface ResetPasswordError extends Omit<FSA, 'payload'> {
    payload: { message: string }
}
export const resetPasswordError = (message: string) => ({
    payload: { message },
    type: RESET_PASSWORD_ERROR,
}) as ResetPasswordError;
export type ResetPasswordErrorAction = typeof resetPasswordError;

export const RESET_PASSWORD_SUCCESS = 'USER_RESET_PASSWORD_SUCCESS';
export type ResetPasswordSuccess = FSA;
export const resetPasswordSuccess = () => ({
    type: RESET_PASSWORD_SUCCESS,
}) as ResetPasswordSuccess;
export type ResetPasswordSuccessAction = typeof resetPasswordSuccess;

export const FORGOT_PASSWORD_REQUEST = 'USER_FORGOT_PASSWORD_REQUEST';
export interface ForgotPasswordRequest extends Omit<FSA, 'payload'> {
    payload: { email: string }
}
export const forgotPasswordRequest = (email: string) => ({
    payload: { email },
    type: FORGOT_PASSWORD_REQUEST,
}) as ForgotPasswordRequest;
export type ForgotPasswordRequestAction = typeof forgotPasswordRequest;

export const FORGOT_PASSWORD_REQUEST_SENT = 'USER_FORGOT_PASSWORD_REQUEST_SENT';
export type ForgotPasswordRequestSent = FSA;
export const forgotPasswordRequestSent = () => ({
    type: FORGOT_PASSWORD_REQUEST_SENT,
}) as ForgotPasswordRequestSent;
export type ForgotPasswordRequestSentAction = typeof forgotPasswordRequestSent;

export const FORGOT_PASSWORD_REQUEST_ERROR = 'USER_FORGOT_PASSWORD_REQUEST_ERROR';
export interface ForgotPasswordRequestError extends Omit<FSA, 'payload'> {
    payload: { message: string }
}
export const forgotPasswordRequestError = (message: string) => ({
    payload: { message },
    type: FORGOT_PASSWORD_REQUEST_ERROR,
}) as ForgotPasswordRequestError;
export type ForgotPasswordRequestErrorAction = typeof forgotPasswordRequestError;

export const FORGOT_PASSWORD_RESET = 'USER_FORGOT_PASSWORD_RESET';
export interface ForgotPasswordReset extends Omit<FSA, 'payload'> {
    payload: { username: string; verification: string; newPassword: string }
}
export const forgotPasswordReset = (
    username: string,
    verification: string,
    newPassword: string,
) => ({
    payload: { username, verification, newPassword },
    type: FORGOT_PASSWORD_RESET,
}) as ForgotPasswordReset;
export type ForgotPasswordResetAction = typeof forgotPasswordReset;

export const FORGOT_PASSWORD_RESET_ERROR = 'USER_FORGOT_PASSWORD_RESET_ERROR';
export interface ForgotPasswordResetError extends Omit<FSA, 'payload'> {
    payload: { message: string }
}
export const forgotPasswordResetError = (message: string) => ({
    payload: { message },
    type: FORGOT_PASSWORD_RESET_ERROR,
}) as ForgotPasswordResetError;
export type ForgotPasswordResetErrorAction = typeof forgotPasswordResetError;

export const FORGOT_PASSWORD_RESET_SUCCESS = 'USER_FORGOT_PASSWORD_RESET_SUCCESS';
export type ForgotPasswordResetSuccess = FSA;
export const forgotPasswordResetSuccess = () => ({
    type: FORGOT_PASSWORD_RESET_SUCCESS,
}) as ForgotPasswordResetSuccess;
export type ForgotPasswordResetSuccessAction = typeof forgotPasswordResetSuccess;
