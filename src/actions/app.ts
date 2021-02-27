import { FSA } from 'flux-standard-action';
import { UserQueryResult } from '../types';
import { AppInfo } from '../state';

export const CREATE = 'APP_CREATE';
export interface Create extends Omit<FSA, 'payload'> {
    payload: { email: string; password: string; username: string }
}
export const create = (email: string, password: string, username: string) => ({
    payload: { email, password, username },
    type: CREATE,
}) as Create;
export type CreateAction = typeof create;

export const CREATE_SUCCESS = 'APP_CREATE_SUCCESS';
export type CreateSuccess = FSA;
export const createSuccess = () => ({
    type: CREATE_SUCCESS,
}) as CreateSuccess;
export type CreateSuccessAction = typeof createSuccess;

export const CREATE_FAILED = 'APP_CREATE_FAILED';
export interface CreateFailed extends Omit<FSA, 'payload'> {
    payload: { message: string }
}
export const createFailed = (message: string) => ({
    payload: { message },
    type: CREATE_FAILED,
}) as CreateFailed;
export type CreateFailedAction = typeof createFailed;

export const LIST = 'APP_LIST';
export type List = FSA;
export const list = () => ({
    type: LIST,
}) as List;
export type ListAction = typeof list;

export const LIST_SET = 'APP_LIST_SET';
export interface ListSet extends Omit<FSA, 'payload'> {
    payload: { apps: Record<string, string> }
}
export const listSet = (apps: Record<string, string>) => ({
    payload: { apps },
    type: LIST_SET,
}) as ListSet;
export type ListSetAction = typeof listSet;

export const GET = 'APP_GET';
export interface Get extends Omit<FSA, 'payload'> {
    payload: { username: string; }
}
export const get = (username: string) => ({
    payload: { username },
    type: GET,
}) as Get;
export type GetAction = typeof get;

export const SET = 'APP_SET';
export interface Set extends Omit<FSA, 'payload'> {
    payload: AppInfo;
}
export const set = (payload: Set['payload']) => ({
    payload,
    type: SET,
}) as Set;
export type SetAction = typeof set;

export const CREATE_ENTRY = 'APP_CREATE_ENTRY';
export interface CreateEntry extends Omit<FSA, 'payload'> {
    payload: {
        entryType: string;
        mediationNetwork: string;
        name: string, id: string;
        extraData?: Record<string, string>;
    }
}
export const createEntry = (
    entryType: string,
    mediationNetwork: string,
    name: string,
    id: string,
    extraData?: Record<string, string>,
) => ({
    payload: {
        entryType,
        mediationNetwork,
        name,
        id,
        extraData,
    },
    type: CREATE_ENTRY,
}) as CreateEntry;
export type CreateEntryAction = typeof createEntry;

export const CREATE_ENTRY_SUCCESS = 'APP_CREATE_ENTRY_SUCCESS';
export type CreateEntrySuccess = FSA;
export const createEntrySuccess = () => ({
    type: CREATE_ENTRY_SUCCESS,
}) as CreateEntrySuccess;
export type CreateEntrySuccessAction = typeof createEntrySuccess;

export const SET_ENTRIES = 'APP_SET_ENTRIES';
export interface SetEntries extends Omit<FSA, 'payload'> {
    payload: { entries: UserQueryResult[] }
}
export const setEntries = (entries: UserQueryResult[]) => ({
    payload: { entries },
    type: SET_ENTRIES,
}) as SetEntries;
export type SetEntriesAction = typeof setEntries;

export const DELETE_ENTRY = 'APP_DELETE_ENTRY';
export interface DeleteEntry extends Omit<FSA, 'payload'> {
    payload: { type: string; network: string; id: string }
}
export const deleteEntry = (type: string, network: string, id: string) => ({
    payload: { type, network, id },
    type: DELETE_ENTRY,
}) as DeleteEntry;
export type DeleteEntryAction = typeof deleteEntry;

export const SAVE_SETTINGS = 'APP_SAVE_SETTINGS';
export interface SaveSettings extends Omit<FSA, 'payload'> {
    payload: { wallet: string }
}
export const saveSettings = (
    appId: string,
    wallet: string,
) => ({
    payload: {
        appId,
        wallet,
    },
    type: SAVE_SETTINGS,
}) as SaveSettings;
export type SaveSettingsAction = typeof saveSettings;
