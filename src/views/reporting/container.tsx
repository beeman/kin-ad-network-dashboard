import { connect } from 'react-redux';

import {
    getReporting,
} from '../../actions/reporting';

import Component from './component';
import { getReportingData } from '../../selectors/reporting';
import State from '../../state';
import { getUserGroup } from '../../selectors/user';

const mapStateToProps = (state: State) => ({
    reporting: getReportingData(state),
    group: getUserGroup(state),
});

const mapDispatchToProps = {
    getReporting,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
