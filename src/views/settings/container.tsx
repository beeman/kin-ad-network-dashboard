import { connect } from 'react-redux';

import { resetPasswordRequest } from '../../actions/user';
import { getResetPasswordError, getResetPasswordSubmitting } from '../../selectors/user';

import Component from './component';
import State from '../../state';

const mapDispatchToProps = {
    resetPasswordRequest,
};

const mapStateToProps = (state: State) => ({
    errorMessage: getResetPasswordError(state),
    submitting: getResetPasswordSubmitting(state),
});


export default connect(mapStateToProps, mapDispatchToProps)(Component);
