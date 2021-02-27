import { connect } from 'react-redux';

import Component from './component';
import { getUserGroup } from '../../selectors/user';
import State from '../../state';

const mapStateToProps = (state: State) => ({
    group: getUserGroup(state),
});

export default connect(mapStateToProps)(Component);
