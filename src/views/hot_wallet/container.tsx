import { connect } from 'react-redux';

import { getByDate, set } from '../../actions/payouts';
import { list } from '../../actions/app';

import { getHotWallet } from '../../selectors/hotWallet';
import { getPayouts } from '../../selectors/payouts';

import Component from './component';
import State from '../../state';
import { getAppsByUserId } from '../../selectors/app';

const mapStateToProps = (state: State) => ({
    data: getHotWallet(state),
    payouts: getPayouts(state),
    apps: getAppsByUserId(state),
});

const mapDispatchToProps = {
    getByDate,
    list,
    set,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
