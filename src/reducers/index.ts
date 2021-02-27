import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';

import app from './app';
import user from './user';
import init from './init';
import locales from './locales';
import reporting from './reporting';
import hotWallet from './hotWallet';
import payouts from './payouts';

export default (history: History) => combineReducers({
    router: connectRouter(history),
    locales,
    init,
    app,
    user,
    reporting,
    hotWallet,
    payouts,
});
