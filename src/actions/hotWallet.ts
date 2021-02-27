import { FSA } from 'flux-standard-action';
import { HotWallet } from '../types';

export const SET = 'HOT_WALLET_SET';
export interface Set extends Omit<FSA, 'payload'> {
    payload: { hotWallet: HotWallet };
}
export const set = (hotWallet: HotWallet) => ({
    payload: { hotWallet },
    type: SET,
}) as Set;
export type SetAction = typeof set;
