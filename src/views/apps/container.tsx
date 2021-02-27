import { connect } from 'react-redux';

import { list } from '../../actions/app';

import { getAppList } from '../../selectors/app';

import State from '../../state';

import Component from './component';

const mapStateToProps = (state: State) => ({
    apps: getAppList(state),
});

const mapDispatchToProps = {
    list,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
