import * as initActions from '../actions/init';
import State from '../state';

const initialState: State['init'] = {
    complete: false,
};

const initReducer = (state = initialState, action: any): State['init'] => {
    switch (action.type) {
        case initActions.INIT_COMPLETE: {
            return {
                ...state,
                complete: true,
            };
        }
        default:
            return state;
    }
};

export default initReducer;
