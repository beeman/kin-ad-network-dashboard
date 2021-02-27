import { FSA } from 'flux-standard-action';

export const INIT_COMPLETE = 'INIT_INIT_COMPLETE';
export type InitComplete = FSA;
export const initComplete = () => ({
    type: INIT_COMPLETE,
}) as InitComplete;
export type InitCompleteAction = typeof initComplete;
