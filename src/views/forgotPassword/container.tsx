import { connect } from 'react-redux';

import { forgotPasswordRequest } from '../../actions/user';
import { getUserId, getForgotPasswordError, getForgotPasswordSubmitting } from '../../selectors/user';

import Component from './component';
import State from '../../state';

const mapDispatchToProps = {
    forgotPasswordRequest,
};

const mapStateToProps = (state: State) => ({
    userId: getUserId(state),
    errorMessage: getForgotPasswordError(state),
    submitting: getForgotPasswordSubmitting(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
