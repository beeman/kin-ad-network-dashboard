import React, { Component } from 'react';
import {
    Button,
    Form,
    Grid,
    Image,
    Segment,
    Message,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl, WrappedComponentProps } from 'react-intl';

import { LoginAction } from '../../actions/user';

interface State {
    username: string;
    password: string;
}

interface Props extends WrappedComponentProps {
    errorMessage?: string;
    login: LoginAction;
    submitting: boolean;
    userId?: string;
}

class Login extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };

        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
    }

    setUsername(value: string) {
        this.setState({ username: value });
    }

    setPassword(value: string) {
        this.setState({ password: value });
    }

    render() {
        const {
            errorMessage,
            intl,
            login,
            submitting,
        } = this.props;
        const { username, password } = this.state;

        return (
            <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Image src="/logo.png" />
                    {errorMessage && (
                        <Message negative>
                            <Message.Header>
                                {intl.formatMessage({ id: errorMessage })}
                            </Message.Header>
                        </Message>
                    )}
                    <Form size="large">
                        <Segment stacked>
                            <Form.Input
                                fluid
                                icon="user"
                                iconPosition="left"
                                placeholder={intl.formatMessage({ id: 'username_placeholder' })}
                                onChange={(e) => this.setUsername(e.target.value)}
                            />
                            <Form.Input
                                fluid
                                icon="lock"
                                iconPosition="left"
                                placeholder={intl.formatMessage({ id: 'password_placeholder' })}
                                type="password"
                                onChange={(e) => this.setPassword(e.target.value)}
                            />

                            <Button
                                disabled={submitting}
                                color="teal"
                                fluid
                                size="large"
                                onClick={() => login(username, password)}
                            >
                                <FormattedMessage id="login" />
                            </Button>
                            <Link to="/forgot_password"><FormattedMessage id="forgot_password_link" /></Link>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}

export default injectIntl(Login);
