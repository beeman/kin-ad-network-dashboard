import * as reportingActions from '../actions/reporting';
import State from '../state';

const initialState: State['reporting'] = {
    reporting: undefined,
};

const reportingReducer = (state = initialState, action: any): State['reporting'] => {
    switch (action.type) {
        case reportingActions.SET: {
            const { payload } = action as reportingActions.SetReporting;
            return { ...state, reporting: payload.data };
        }
        case reportingActions.GET: {
            return initialState;
        }
        default:
            return state;
    }
};

export default reportingReducer;
