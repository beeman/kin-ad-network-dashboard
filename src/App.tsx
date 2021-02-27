import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { SemanticToastContainer } from 'react-semantic-toasts';
import { Dimmer, Loader, Container } from 'semantic-ui-react';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';

import State from './state';
import { getUserId } from './selectors/user';
import { getInitComplete } from './selectors/init';

import TopNav from './appFrame/topnav/component';

import Login from './views/login/container';
import ForgotPassword from './views/forgotPassword/container';
import ForgotPasswordReset from './views/forgotPasswordReset/container';
import Router from './AuthenticatedRouter';

const mapStateToProps = (state: State) => ({
    initComplete: getInitComplete(state),
    userId: getUserId(state),
});

interface Props {
    initComplete: boolean;
    history: History;
    userId?: string;
}

class App extends Component<Props, unknown> {
    render() {
        const { history, initComplete, userId } = this.props;

        if (!initComplete) {
            return (
                <Container style={{ height: '100%' }}>
                    <Dimmer active inverted>
                        <Loader inverted size="massive">Loading</Loader>
                    </Dimmer>
                </Container>
            );
        }

        if (userId) {
            // Put React Router here
            return <Router history={history} />;
        }

        return (
            <ConnectedRouter history={history}>
                <TopNav />
                <Switch>
                    <Route exact path="/"><Login /></Route>
                    <Route exact path="/forgot_password"><ForgotPassword /></Route>
                    <Route exact path="/forgot_password_reset"><ForgotPasswordReset /></Route>
                    <Route component={Login} />
                </Switch>
                <SemanticToastContainer />;
            </ConnectedRouter>
        );
    }
}

export default connect(mapStateToProps)(App);
