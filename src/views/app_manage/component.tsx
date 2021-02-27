import React, { Component } from 'react';
import {
    Header, Segment, Table, Button, Icon, Form, Input,
} from 'semantic-ui-react';
import { FormattedMessage, injectIntl, WrappedComponentProps } from 'react-intl';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import {
    GetAction,
    DeleteEntryAction,
    SaveSettingsAction,
} from '../../actions/app';
import { ReportingEntry } from '../../types';
import DeleteModal from '../../components/deleteModal.ts/component';

interface State {
    wallet: string;
    appId: string;
}

interface Props extends WrappedComponentProps {
    deleteEntry: DeleteEntryAction;
    get: GetAction;
    saveSettings: SaveSettingsAction;
    username: string;
    userId: string;
    reportingEntries?: ReportingEntry[];
    submitting: boolean;
    wallet?: string;
    appId?: string;
}

class ManageApp extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            appId: props.appId || '',
            wallet: props.wallet || '',
        };

        this.saveSettings = this.saveSettings.bind(this);
        this.updateValue = this.updateValue.bind(this);
    }

    componentDidMount() {
        const { get, username } = this.props;
        get(username);
    }

    componentDidUpdate(prevProps: Props) {
        const propsToUpdateState = [
            'appId',
            'wallet',
        ] as const;
        for (let i = 0; i < propsToUpdateState.length; i += 1) {
            const key = propsToUpdateState[i];
            // eslint-disable-next-line react/destructuring-assignment
            if (prevProps[key] !== this.props[key]) {
                // @ts-ignore
                this.setState({ [key]: this.props[key] || '' }); // eslint-disable-line
            }
        }
    }

    updateValue(field: keyof State, value: string | boolean | number) {
        this.setState({ [field]: value } as unknown as Pick<State, keyof State>);
    }

    saveSettings() {
        const {
            appId,
            wallet,
        } = this.state;
        const { saveSettings } = this.props;

        saveSettings(
            appId,
            wallet,
        );
    }

    render() {
        const {
            intl,
            deleteEntry,
            username,
            reportingEntries,
        } = this.props;
        const {
            appId,
            wallet,
        } = this.state;

        return (
            <div>
                <Link to="/">&laquo; <FormattedMessage id="back" /></Link>
                <Header size="huge"><FormattedMessage id="manage_app" values={{ username }} /></Header>
                <Segment>
                    <Header><FormattedMessage id="settings" /></Header>
                    <Form>
                        <Form.Field>
                            <label><FormattedMessage id="wallet" /></label>
                            <Input
                                type="text"
                                placeholder={intl.formatMessage({ id: 'wallet_placeholder' })}
                                onChange={(e, data) => this.updateValue('wallet', data.value as string)}
                                value={wallet}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label><FormattedMessage id="appId" /></label>
                            <Input
                                type="text"
                                placeholder={intl.formatMessage({ id: 'appId_placeholder' })}
                                onChange={(e, data) => this.updateValue('appId', data.value as string)}
                                value={appId}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Button
                                primary
                                onClick={this.saveSettings}
                            >
                                <FormattedMessage id="save" />
                            </Button>
                        </Form.Field>
                    </Form>
                </Segment>
                <Segment.Group horizontal compact>
                    <Segment>
                        <Header floated="left"><FormattedMessage id="reporting_entries" /></Header>
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell><FormattedMessage id="entry_name" /></Table.HeaderCell>
                                    <Table.HeaderCell><FormattedMessage id="mediation_network" /></Table.HeaderCell>
                                    <Table.HeaderCell><FormattedMessage id="apps_reporting_id" /></Table.HeaderCell>
                                    <Table.HeaderCell>
                                        <LinkContainer to={`/app/${username}/entry_update/reporting`}>
                                            <Button
                                                floated="right"
                                                icon
                                                labelPosition="left"
                                                primary
                                                size="small"
                                            >
                                                <Icon name="user" /> <FormattedMessage id="entry_add" />
                                            </Button>
                                        </LinkContainer>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {reportingEntries && reportingEntries.map((entry) => (
                                    <Table.Row key={`${entry.mediationNetwork}${entry.id}`}>
                                        <Table.Cell>{entry.name}</Table.Cell>
                                        <Table.Cell>{intl.formatMessage({ id: `mediation_network_${entry.mediationNetwork}` })}</Table.Cell>
                                        <Table.Cell>{entry.id}</Table.Cell>
                                        <Table.Cell>
                                            <DeleteModal contentText="delete_modal_content" buttonText="delete" floated="right" action={() => deleteEntry('reporting', entry.mediationNetwork, entry.id)} />
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </Segment>
                </Segment.Group>
            </div>
        );
    }
}

export default injectIntl(ManageApp);
