import State from '../state';
import { LOAD, Load } from '../actions/language';

const initialState: State['locales'] = {
    lang: 'en',
    messages: {},
};

const initReducer = (state = initialState, action: any): State['locales'] => {
    switch (action.type) {
        case LOAD: {
            const { payload } = action as Load;
            return payload;
        }
        default:
            return state;
    }
};

export default initReducer;
