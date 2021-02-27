import State from '../state';
import {
    CREATE,
    CREATE_SUCCESS,
    CREATE_FAILED,
    CreateFailed,
    ListSet,
    LIST_SET,
    SET,
    Set,
    CREATE_ENTRY,
    CREATE_ENTRY_SUCCESS,
    SetEntries,
    SET_ENTRIES,
} from '../actions/app';
import { ReportingEntry, MediationNetwork } from '../types';

const initialState: State['app'] = {
    createSubmitting: false,
    createEntrySubmitting: false,
    createErrorMessage: undefined,
    apps: {},
    currentApp: undefined,
};

const appReducer = (state = initialState, action: any): State['app'] => {
    switch (action.type) {
        case CREATE: {
            return {
                ...state,
                createSubmitting: true,
            };
        }
        case CREATE_SUCCESS: {
            return {
                ...state,
                createErrorMessage: undefined,
                createSubmitting: false,
            };
        }
        case CREATE_FAILED: {
            const { payload } = action as CreateFailed;
            return {
                ...state,
                createErrorMessage: payload.message,
                createSubmitting: false,
            };
        }
        case LIST_SET: {
            const { payload } = action as ListSet;
            return {
                ...state,
                apps: payload.apps,
            };
        }
        case SET: {
            const { payload } = action as Set;
            return {
                ...state,
                currentApp: {
                    entries: state.currentApp?.entries,
                    ...payload,
                },
            };
        }
        case CREATE_ENTRY: {
            return {
                ...state,
                createEntrySubmitting: true,
            };
        }
        case CREATE_ENTRY_SUCCESS: {
            return {
                ...state,
                createEntrySubmitting: false,
            };
        }
        case SET_ENTRIES: {
            const { payload } = action as SetEntries;
            const reportingEntries = [] as ReportingEntry[];
            payload.entries.forEach((entry) => {
                if (entry.dataIdx.startsWith('reporting#')) {
                    reportingEntries.push({
                        name: entry.name,
                        mediationNetwork: entry.dataIdx.split('#')[1] as MediationNetwork,
                        id: entry.dataIdx.split('#')[2],
                    });
                }
            });
            return {
                ...state,
                currentApp: {
                    ...state.currentApp!,
                    entries: {
                        reporting: reportingEntries,
                    },
                },
            };
        }
        default:
            return state;
    }
};

export default appReducer;
