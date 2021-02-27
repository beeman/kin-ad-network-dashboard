import { connect } from 'react-redux';

import { login } from '../../actions/user';
import { getUserId, getErrorMessage, getLoginSubmitting } from '../../selectors/user';

import Component from './component';
import State from '../../state';

const mapDispatchToProps = {
    login,
};

const mapStateToProps = (state: State) => ({
    userId: getUserId(state),
    errorMessage: getErrorMessage(state),
    submitting: getLoginSubmitting(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
