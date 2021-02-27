import { createSelector } from 'reselect';
import State from '../state';

const initSelector = (state: Pick<State, 'init'>) => state.init;

export const getInitComplete = createSelector(
    initSelector,
    ({ complete }) => complete,
);
