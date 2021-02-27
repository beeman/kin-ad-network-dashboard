import React, { Component } from 'react';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import {
    Icon,
    Menu,
    Segment,
    Sidebar,
} from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';

import style from './style.module.css';

interface Props {
    children?: any
    group?: string;
}

class SideNav extends Component<Props, unknown> {
    render() {
        const { children, group } = this.props;
        return (
            <Sidebar.Pushable as={Segment} className={style.sidebar}>
                <Sidebar
                    as={Menu}
                    animation="uncover"
                    icon="labeled"
                    inverted
                    vertical
                    direction="left"
                    visible
                    width="thin"
                >
                    {group === 'AdminGroup' && (
                        <>
                            <IndexLinkContainer to="/">
                                <Menu.Item>
                                    <Icon name="rocket" />
                                    <FormattedMessage id="apps" />
                                </Menu.Item>
                            </IndexLinkContainer>
                            <LinkContainer to="/reporting">
                                <Menu.Item>
                                    <Icon name="chart line" />
                                    <FormattedMessage id="reporting" />
                                </Menu.Item>
                            </LinkContainer>
                            <LinkContainer to="/hot_wallet">
                                <Menu.Item>
                                    <Icon name="money" />
                                    <FormattedMessage id="hot_wallet" />
                                </Menu.Item>
                            </LinkContainer>
                        </>
                    )}
                    {group === 'UserGroup' && (
                        <>
                            <IndexLinkContainer to="/">
                                <Menu.Item>
                                    <Icon name="chart line" />
                                    <FormattedMessage id="reporting" />
                                </Menu.Item>
                            </IndexLinkContainer>
                            <LinkContainer to="/app_payouts/me">
                                <Menu.Item>
                                    <Icon name="money" />
                                    <FormattedMessage id="apps_payouts" />
                                </Menu.Item>
                            </LinkContainer>
                        </>
                    )}

                </Sidebar>

                <Sidebar.Pusher style={{ width: 'calc(100% - 150px)' }}>
                    <Segment basic>
                        {children}
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }
}

export default SideNav;
