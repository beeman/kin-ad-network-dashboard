import { createSelector } from 'reselect';
import State from '../state';

const reportingSelector = (state: Pick<State, 'reporting'>) => state.reporting;

export const getReportingData = createSelector(
    reportingSelector,
    ({ reporting }) => reporting,
);
