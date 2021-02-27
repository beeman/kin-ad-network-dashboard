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

import { ForgotPasswordRequestAction } from '../../actions/user';

interface State {
    username: string;
}

interface Props extends WrappedComponentProps {
    errorMessage?: string;
    forgotPasswordRequest: ForgotPasswordRequestAction;
    submitting: boolean;
}

class ForgotPassword extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            username: '',
        };

        this.setUsername = this.setUsername.bind(this);
    }

    setUsername(value: string) {
        this.setState({ username: value });
    }

    render() {
        const {
            errorMessage,
            forgotPasswordRequest,
            intl,
            submitting,
        } = this.props;
        const { username } = this.state;

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

                            <Button
                                disabled={submitting}
                                color="teal"
                                fluid
                                size="large"
                                onClick={() => forgotPasswordRequest(username)}
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

export default injectIntl(ForgotPassword);
