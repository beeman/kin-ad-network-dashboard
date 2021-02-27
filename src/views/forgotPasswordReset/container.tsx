import { connect } from 'react-redux';

import { forgotPasswordReset } from '../../actions/user';
import { getUserId, getForgotPasswordResetErrorMessage, getForgotPasswordResetSubmitting } from '../../selectors/user';

import Component from './component';
import State from '../../state';

const mapDispatchToProps = {
    forgotPasswordReset,
};

const mapStateToProps = (state: State) => ({
    userId: getUserId(state),
    errorMessage: getForgotPasswordResetErrorMessage(state),
    submitting: getForgotPasswordResetSubmitting(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
