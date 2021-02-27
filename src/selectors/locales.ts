import { createSelector } from 'reselect';
import State from '../state';

const localesSelector = (state: Pick<State, 'locales'>) => state.locales;

export const getLang = createSelector(
    localesSelector,
    ({ lang }) => lang,
);

export const getMessage = (message: string) => createSelector(
    localesSelector,
    ({ messages }) => messages[message],
);
