import { createSelector } from 'reselect';
import State from '../state';

const hotWalletSelector = (state: Pick<State, 'hotWallet'>) => state.hotWallet;

export const getHotWallet = createSelector(
    hotWalletSelector,
    ({ hotWallet }) => hotWallet,
);
