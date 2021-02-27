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

import { ForgotPasswordResetAction } from '../../actions/user';

interface State {
    email: string;
    verification: string;
    newPassword: string;
}

interface Props extends WrappedComponentProps {
    errorMessage?: string;
    forgotPasswordReset: ForgotPasswordResetAction;
    submitting: boolean;
}

class ForgotPasswordReset extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            email: '',
            verification: '',
            newPassword: '',
        };

        this.setEmail = this.setEmail.bind(this);
        this.setVerification = this.setVerification.bind(this);
        this.setNewPassword = this.setNewPassword.bind(this);
    }

    setEmail(value: string) {
        this.setState({ email: value });
    }

    setVerification(value: string) {
        this.setState({ verification: value });
    }

    setNewPassword(value: string) {
        this.setState({ newPassword: value });
    }

    render() {
        const {
            errorMessage,
            forgotPasswordReset,
            intl,
            submitting,
        } = this.props;
        const { email, verification, newPassword } = this.state;

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
                                onChange={(e) => this.setEmail(e.target.value)}
                            />
                            <Form.Input
                                fluid
                                icon="shield"
                                iconPosition="left"
                                placeholder={intl.formatMessage({ id: 'verification_placeholder' })}
                                onChange={(e) => this.setVerification(e.target.value)}
                            />
                            <Form.Input
                                fluid
                                icon="lock"
                                iconPosition="left"
                                placeholder={intl.formatMessage({ id: 'newPassword_placeholder' })}
                                type="password"
                                onChange={(e) => this.setNewPassword(e.target.value)}
                            />

                            <Button
                                disabled={submitting}
                                color="teal"
                                fluid
                                size="large"
                                onClick={() => forgotPasswordReset(
                                    email,
                                    verification,
                                    newPassword,
                                )}
                            >
                                <FormattedMessage id="submit" />
                            </Button>
                            <Link to="/"><FormattedMessage id="back_to_login" /></Link>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}

export default injectIntl(ForgotPasswordReset);
