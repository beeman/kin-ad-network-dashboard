import { FSA } from 'flux-standard-action';
import { Payout } from '../types';

export const GET = 'PAYOUTS_GET';
export interface Get extends Omit<FSA, 'payload'> {
    payload: { username: string };
}
export const get = (username: string) => ({
    payload: { username },
    type: GET,
}) as Get;
export type GetAction = typeof get;

export const GET_BY_DATE = 'PAYOUTS_GET_BY_DATE';
export interface GetByDate extends Omit<FSA, 'payload'> {
    payload: { date: string };
}
export const getByDate = (date: string) => ({
    payload: { date },
    type: GET_BY_DATE,
}) as GetByDate;
export type GetByDateAction = typeof getByDate;

export const SET = 'PAYOUTS_SET';
export interface Set extends Omit<FSA, 'payload'> {
    payload: { payouts: Payout[] }
}
export const set = (payouts: Payout[]) => ({
    payload: { payouts },
    type: SET,
}) as Set;
export type SetAction = typeof set;
