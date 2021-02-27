import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import { AnyAction } from 'redux';

const modalStyle = {
    height: 'auto',
    top: 'auto',
    left: 'auto',
    bottom: 'auto',
    right: 'auto',
};

interface State {
    open: boolean;
}

interface Props {
    action: () => AnyAction;
    floated?: 'left'|'right';
    buttonText: string;
    contentText: string;
}

class DeleteModal extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = { open: false };
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }

    show() {
        this.setState({ open: true });
    }

    hide() {
        this.setState({ open: false });
    }

    render() {
        const {
            action,
            contentText,
            floated,
            buttonText,
        } = this.props;
        const { open } = this.state;

        return (
            <div>
                <Modal
                    size="tiny"
                    style={modalStyle}
                    open={open}
                    trigger={<Button onClick={this.show} floated={floated} color="red" size="small"><FormattedMessage id={buttonText} /></Button>}
                    onClose={this.hide}
                >
                    <Modal.Header><FormattedMessage id="delete_modal_header" /></Modal.Header>
                    <Modal.Content>
                        <p><FormattedMessage id={contentText} /></p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.hide}><FormattedMessage id="no" /></Button>
                        <Button
                            positive
                            icon="checkmark"
                            labelPosition="right"
                            content={<FormattedMessage id="yes" />}
                            onClick={() => { action(); this.hide(); }}
                        />
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default DeleteModal;
