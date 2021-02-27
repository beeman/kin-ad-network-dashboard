/* eslint-disable max-classes-per-file */
import React, { Component } from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom';
import { SemanticToastContainer } from 'react-semantic-toasts';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import { connect } from 'react-redux';

import TopNav from './appFrame/topnav/component';
import SideNav from './appFrame/sidenav/container';

import ManageApp from './views/app_manage/container';
import AppEntryAdd from './views/app_entry_update/container';
import Apps from './views/apps/container';
import Settings from './views/settings/container';
import AppAdd from './views/app_add/container';
import NotFound from './views/notFound/component';
import Reporting from './views/reporting/container';
import HotWallet from './views/hot_wallet/container';
import AppPayouts from './views/app_payouts/container';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-semantic-toasts/styles/react-semantic-alert.css';

import { getUserGroup } from './selectors/user';
import State from './state';

const mapStateToProps = (state: State) => ({
    group: getUserGroup(state),
});
class AppOrReporting extends Component<{ group?: string }, unknown> {
    render() {
        const { group } = this.props;
        if (group === 'AdminGroup') {
            return <Apps />;
        }
        if (group === 'UserGroup') {
            return <Reporting />;
        }

        return undefined;
    }
}
const RootRoute = connect(mapStateToProps)(AppOrReporting);

interface Props {
    history: History;
}

export default class App extends Component<Props, unknown> {
    render() {
        const { history } = this.props;
        return (
            <ConnectedRouter history={history}>
                <TopNav />
                <SideNav>
                    <Switch>
                        <Route exact path="/"><RootRoute /></Route>
                        <Route exact path="/settings"><Settings /></Route>
                        <Route exact path="/app_add"><AppAdd /></Route>
                        <Route path="/app/:username/entry_update/reporting/:entryId?" component={AppEntryAdd} />
                        <Route path="/app/:username" component={ManageApp} />
                        <Route path="/app_payouts/:username" component={AppPayouts} />
                        <Route path="/reporting" component={Reporting} />
                        <Route path="/hot_wallet" component={HotWallet} />
                        <Route component={NotFound} />
                    </Switch>
                </SideNav>
                <SemanticToastContainer />;
            </ConnectedRouter>
        );
    }
}
