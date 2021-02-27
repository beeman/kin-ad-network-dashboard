import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import ConnectedIntlProvider from './ConnectedIntlProvider';
import createRootReducer from './reducers';
import App from './App';

import sagas from './sagas';

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    createRootReducer(history),
    composeWithDevTools(applyMiddleware(routerMiddleware(history), sagaMiddleware)),
);
sagaMiddleware.run(sagas);

render(
    <Provider store={store}>
        <ConnectedIntlProvider>
            <App history={history} />
        </ConnectedIntlProvider>
    </Provider>,
    document.getElementById('root'),
);
