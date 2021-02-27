import { createSelector } from 'reselect';
import State from '../state';

const appSelector = (state: Pick<State, 'app'>) => state.app;

export const getCreateSubmitting = createSelector(
    appSelector,
    ({ createSubmitting }) => createSubmitting,
);

export const getCreateEntrySubmitting = createSelector(
    appSelector,
    ({ createEntrySubmitting }) => createEntrySubmitting,
);

export const getCreateErrorMessage = createSelector(
    appSelector,
    ({ createErrorMessage }) => createErrorMessage,
);

export const getAppList = createSelector(
    appSelector,
    ({ apps }) => Object.keys(apps),
);

export const getAppsByUserId = createSelector(
    appSelector,
    ({ apps }) => Object.entries(apps).reduce((acc, [username, userId]) => {
        acc[userId] = username;
        return acc;
    }, {} as Record<string, string>),
);

export const getCurrentApp = createSelector(
    appSelector,
    ({ currentApp }) => currentApp,
);

export const getReportingEntries = createSelector(
    getCurrentApp,
    (currentApp) => currentApp?.entries?.reporting,
);

export const getWallet = createSelector(
    getCurrentApp,
    (currentApp) => currentApp?.wallet,
);

export const getAppId = createSelector(
    getCurrentApp,
    (currentApp) => currentApp?.appId,
);
