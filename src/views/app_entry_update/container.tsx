import { connect } from 'react-redux';

import { get, createEntry } from '../../actions/app';
import { getCreateEntrySubmitting } from '../../selectors/app';

import State from '../../state';

import Component from './component';

const mapStateToProps = (state: State, ownProps: any) => ({
    username: ownProps.match.params.username,
    submitting: getCreateEntrySubmitting(state),
    entryType: ownProps.match.path.split('/')[4],
    modificationType: ownProps.match.params.entryId ? 'edit' : 'add',
});

const mapDispatchToProps = {
    get,
    createEntry,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
