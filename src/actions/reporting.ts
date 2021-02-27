import { FSA } from 'flux-standard-action';

export const GET = 'REPORTING_GET';
export interface GetReporting extends Omit<FSA, 'payload'> {
    payload: { startDate: moment.Moment, numberOfDays: number };
}
export const getReporting = (startDate: moment.Moment, numberOfDays: number) => ({
    payload: { numberOfDays, startDate },
    type: GET,
}) as GetReporting;
export type GetReportingAction = typeof getReporting;

export const SET = 'REPORTING_SET';
export interface SetReporting extends Omit<FSA, 'payload'> {
    payload: { userId: string, date: string, data: Record<string, any> };
}
export const setReporting = (
    data: Record<string, any>,
) => ({
    payload: { data },
    type: SET,
}) as SetReporting;
export type SetReportingAction = typeof setReporting;
