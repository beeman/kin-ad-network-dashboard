import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';

class NotFound extends Component<unknown, unknown> {
    render() {
        return (
            <Header size="huge"><FormattedMessage id="page_not_found" /></Header>
        );
    }
}

export default NotFound;
