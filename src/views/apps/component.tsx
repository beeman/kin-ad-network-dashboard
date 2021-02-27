import React, { Component } from 'react';
import {
    Header,
    Icon,
    Table,
    Button,
} from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import { LinkContainer } from 'react-router-bootstrap';
import { ListAction } from '../../actions/app';

interface State {
}

interface Props {
    list: ListAction;
    apps: string[]
}

class Main extends Component<Props, State> {
    componentDidMount() {
        const { list } = this.props;
        list();
    }

    render() {
        const { apps } = this.props;

        return (
            <div>
                <Header size="huge"><FormattedMessage id="apps" /></Header>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan="4">
                                <LinkContainer to="/app_add">
                                    <Button
                                        floated="right"
                                        icon
                                        labelPosition="left"
                                        primary
                                        size="small"
                                    >
                                        <Icon name="user" /> <FormattedMessage id="apps_add_app" />
                                    </Button>
                                </LinkContainer>
                            </Table.HeaderCell>
                        </Table.Row>

                        <Table.Row>
                            <Table.HeaderCell><FormattedMessage id="apps_name" /></Table.HeaderCell>
                            <Table.HeaderCell collapsing />
                            <Table.HeaderCell collapsing />
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {apps && apps.map((app) => (
                            <Table.Row key={app}>
                                <Table.Cell>{app}</Table.Cell>
                                <Table.Cell>
                                    <LinkContainer to={`/app/${app}`}>
                                        <Button size="small"><FormattedMessage id="apps_manage" /></Button>
                                    </LinkContainer>
                                </Table.Cell>
                                <Table.Cell>
                                    <LinkContainer to={`/app_payouts/${app}`}>
                                        <Button size="small"><FormattedMessage id="apps_payouts" /></Button>
                                    </LinkContainer>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

export default Main;
