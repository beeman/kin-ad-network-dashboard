import * as hotWalletActions from '../actions/hotWallet';
import State from '../state';

const initialState: State['hotWallet'] = {
    hotWallet: undefined,
};

const hotWalletReducer = (state = initialState, action: any): State['hotWallet'] => {
    switch (action.type) {
        case hotWalletActions.SET: {
            const { payload } = action as hotWalletActions.Set;
            return {
                ...state,
                hotWallet: payload.hotWallet,
            };
        }
        default:
            return state;
    }
};

export default hotWalletReducer;
