import React, { Component } from 'react';
import {
    Header,
    Button,
    Input,
    Form,
    Message,
} from 'semantic-ui-react';
import { FormattedMessage, injectIntl, WrappedComponentProps } from 'react-intl';
import { Link } from 'react-router-dom';

import randomString from '../../helpers/randomString';
import { CreateAction } from '../../actions/app';

interface State {
    email: string;
    username: string;
    password: string;
}

interface Props extends WrappedComponentProps {
    errorMessage?: string;
    submitting: boolean;
    create: CreateAction;
}

class AppAdd extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            email: '',
            username: '',
            password: '',
        };

        this.randomPassword = this.randomPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateFieldValue(field: keyof State, value: string) {
        this.setState({ [field]: value } as Pick<State, keyof State>);
    }

    randomPassword() {
        const password = randomString();
        this.setState({ password });
    }

    handleSubmit() {
        const { create } = this.props;
        const { email, password, username } = this.state;
        create(email, password, username);
    }

    render() {
        const { intl, errorMessage, submitting } = this.props;
        const { password } = this.state;

        return (
            <div>
                <Link to="/">&laquo; <FormattedMessage id="back" /></Link>
                <Header size="huge"><FormattedMessage id="apps_add_app" /></Header>
                {errorMessage && (
                    <Message negative>
                        <Message.Header>
                            {intl.formatMessage({ id: errorMessage })}
                        </Message.Header>
                    </Message>
                )}
                <Form>
                    <Form.Field>
                        <label><FormattedMessage id="email_address" /></label>
                        <Input
                            type="text"
                            placeholder={intl.formatMessage({ id: 'email_placeholder' })}
                            onChange={(e) => this.updateFieldValue('email', e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label><FormattedMessage id="username" /></label>
                        <Input
                            type="text"
                            placeholder={intl.formatMessage({ id: 'username_placeholder' })}
                            onChange={(e) => this.updateFieldValue('username', e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label><FormattedMessage id="password" /></label>
                        <Input
                            label={<Button onClick={this.randomPassword}><FormattedMessage id="generate_random" /></Button>}
                            labelPosition="right"
                            type="text"
                            placeholder={intl.formatMessage({ id: 'password_placeholder' })}
                            onChange={(e) => this.updateFieldValue('password', e.target.value)}
                            value={password}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Button
                            disabled={submitting}
                            primary
                            onClick={this.handleSubmit}
                        >
                            <FormattedMessage id="submit" />
                        </Button>
                    </Form.Field>
                </Form>
            </div>
        );
    }
}

export default injectIntl(AppAdd);
