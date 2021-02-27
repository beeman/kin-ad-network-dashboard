import React, { Component } from 'react';
import {
    Header, Segment, Button, Form, Input, Dropdown, Message,
} from 'semantic-ui-react';
import { FormattedMessage, injectIntl, WrappedComponentProps } from 'react-intl';
import { Link } from 'react-router-dom';

import { GetAction, CreateEntryAction } from '../../actions/app';
import randomString from '../../helpers/randomString';
import { reportingNetworks } from '../../helpers/reporting';

interface State {
    name: string;
    id: string;
    mediationNetwork: string;
}

interface Props extends WrappedComponentProps {
    createEntry: CreateEntryAction;
    entryType: string;
    get: GetAction;
    username: string;
    userId: string;
    modificationType: string;
    submitting: boolean;
}

class AppEntryAdd extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            name: '',
            id: '',
            mediationNetwork: '',
        };

        this.handleCreateEntry = this.handleCreateEntry.bind(this);
        this.randomSignature = this.randomSignature.bind(this);
    }

    componentDidMount() {
        const { get, username } = this.props;
        get(username);
    }

    randomSignature(name: string) {
        const val = randomString();
        this.setState({ [name]: val } as Pick<State, keyof State>);
    }

    updateValue(field: keyof State, value: string) {
        this.setState({ [field]: value } as Pick<State, keyof State>);
    }

    handleCreateEntry() {
        const { createEntry, entryType } = this.props;
        const {
            name, id, mediationNetwork,
        } = this.state;
        createEntry(
            entryType,
            mediationNetwork,
            name,
            id,
        );
    }

    render() {
        const {
            id,
            name,
            mediationNetwork,
        } = this.state;
        const {
            intl,
            modificationType,
            entryType,
            username,
            submitting,
        } = this.props;

        let networks = [] as string[];
        if (entryType === 'reporting') {
            networks = reportingNetworks;
        }

        return (
            <div>
                <Link to={`/app/${username}`}>&laquo; <FormattedMessage id="back" /></Link>
                <Header size="huge"><FormattedMessage id={`app_${entryType}_${modificationType}`} values={{ username }} /></Header>
                <Segment>
                    <Form>
                        <Form.Field>
                            <label><FormattedMessage id="mediation_network" /></label>
                            <Dropdown
                                placeholder={intl.formatMessage({ id: 'mediation_network' })}
                                fluid
                                selection
                                options={networks.map((key) => ({
                                    key,
                                    value: key,
                                    text: intl.formatMessage({ id: `mediation_network_${key}` }),
                                }))}
                                onChange={(e, data) => this.updateValue('mediationNetwork', data.value as string)}
                                value={mediationNetwork}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label><FormattedMessage id="name" /></label>
                            <Input
                                type="text"
                                placeholder={intl.formatMessage({ id: 'name_placeholder' })}
                                onChange={(e) => this.updateValue('name', e.target.value)}
                                value={name}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label><FormattedMessage id="mediation_id" /></label>
                            <Input
                                type="text"
                                placeholder={intl.formatMessage({ id: 'mediation_id_placeholder' })}
                                onChange={(e) => this.updateValue('id', e.target.value)}
                                value={id}
                            />
                            {mediationNetwork && <Message><FormattedMessage id={`app_entry_add_hint_${entryType}_${mediationNetwork}`} /></Message>}
                        </Form.Field>
                        <Form.Field>
                            <Button
                                disabled={submitting}
                                primary
                                onClick={this.handleCreateEntry}
                            >
                                <FormattedMessage id="submit" />
                            </Button>
                        </Form.Field>
                    </Form>
                </Segment>
            </div>
        );
    }
}

export default injectIntl(AppEntryAdd);
