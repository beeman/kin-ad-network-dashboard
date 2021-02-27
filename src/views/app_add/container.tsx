import { connect } from 'react-redux';

import { create } from '../../actions/app';

import Component from './component';
import { getCreateSubmitting, getCreateErrorMessage } from '../../selectors/app';
import State from '../../state';

const mapStateToProps = (state: State) => ({
    submitting: getCreateSubmitting(state),
    errorMessage: getCreateErrorMessage(state),
});

const mapDispatchToProps = {
    create,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
