import { connect } from 'react-redux';

import {
    deleteEntry,
    get,
    saveSettings,
} from '../../actions/app';

import State from '../../state';

import Component from './component';
import {
    getReportingEntries, getWallet, getAppId,
} from '../../selectors/app';

const mapStateToProps = (state: State, ownProps: any) => ({
    username: ownProps.match.params.username,
    reportingEntries: getReportingEntries(state),
    wallet: getWallet(state),
    appId: getAppId(state),
});

const mapDispatchToProps = {
    get,
    deleteEntry,
    saveSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
