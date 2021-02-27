import State from '../state';
import { SET, Set } from '../actions/payouts';

const initialState: State['payouts'] = {
    payouts: undefined,
};

const payoutsReducer = (state = initialState, action: any): State['payouts'] => {
    switch (action.type) {
        case SET: {
            const { payload } = action as Set;
            return payload;
        }
        default:
            return state;
    }
};

export default payoutsReducer;
