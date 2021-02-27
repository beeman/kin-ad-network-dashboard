import React, { Component } from 'react';
import {
    Header,
    Segment,
    Input,
    Form,
    Button,
    Message,
} from 'semantic-ui-react';
import { FormattedMessage, injectIntl, WrappedComponentProps } from 'react-intl';

import { ResetPasswordRequestAction } from '../../actions/user';

interface State {
    oldPassword: string,
    newPassword: string,
    newPasswordConfirm: string,
}

interface Props extends WrappedComponentProps {
    errorMessage?: string;
    resetPasswordRequest: ResetPasswordRequestAction;
    submitting: boolean;
}

class Settings extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.handleResetPassword = this.handleResetPassword.bind(this);
        this.state = {
            oldPassword: '',
            newPassword: '',
            newPasswordConfirm: '',
        };
    }

    updateOldPassword(value: string) {
        this.setState({ oldPassword: value });
    }

    updateNewPassword(value: string) {
        this.setState({ newPassword: value });
    }

    updateNewPasswordConfirm(value: string) {
        this.setState({ newPasswordConfirm: value });
    }

    handleResetPassword() {
        const { resetPasswordRequest } = this.props;
        const {
            oldPassword,
            newPassword,
            newPasswordConfirm,
        } = this.state;
        resetPasswordRequest(
            oldPassword,
            newPassword,
            newPasswordConfirm,
        );
    }

    render() {
        const {
            errorMessage,
            intl,
            submitting,
        } = this.props;

        return (
            <div>
                <Header size="huge">
                    <FormattedMessage id="settings" />
                </Header>

                <Segment>
                    <Header><FormattedMessage id="change_password" /></Header>
                    {errorMessage && (
                        <Message negative>
                            <Message.Header>
                                {intl.formatMessage({ id: errorMessage })}
                            </Message.Header>
                        </Message>
                    )}
                    <Form>
                        <Form.Field>
                            <label><FormattedMessage id="old_password" /></label>
                            <Input
                                type="password"
                                placeholder={intl.formatMessage({ id: 'oldPassword_placeholder' })}
                                onChange={(e) => this.updateOldPassword(e.target.value)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label><FormattedMessage id="new_password" /></label>
                            <Input
                                type="password"
                                placeholder={intl.formatMessage({ id: 'newPassword_placeholder' })}
                                onChange={(e) => this.updateNewPassword(e.target.value)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label><FormattedMessage id="new_password_confirm" /></label>
                            <Input
                                type="password"
                                placeholder={intl.formatMessage({ id: 'confirmNewPassword_placeholder' })}
                                onChange={(e) => this.updateNewPasswordConfirm(e.target.value)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Button
                                disabled={submitting}
                                primary
                                onClick={this.handleResetPassword}
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

export default injectIntl(Settings);
