import { createSelector } from 'reselect';
import State from '../state';

const payoutsSelector = (state: Pick<State, 'payouts'>) => state.payouts;

export const getPayouts = createSelector(
    payoutsSelector,
    ({ payouts }) => payouts,
);
