import { connect } from 'react-redux';

import { get } from '../../actions/payouts';

import State from '../../state';

import Component from './component';
import { getPayouts } from '../../selectors/payouts';
import { getUserGroup } from '../../selectors/user';

const mapStateToProps = (state: State, ownProps: any) => ({
    username: ownProps.match.params.username,
    payouts: getPayouts(state),
    group: getUserGroup(state),
});

const mapDispatchToProps = {
    get,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
