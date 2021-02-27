import React, { Component } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { FormattedMessage } from 'react-intl';

import { logout as logoutAction, LogoutAction } from '../../actions/user';
import { set, SetAction } from '../../actions/language';
import State from '../../state';
import { getLang } from '../../selectors/locales';
import { getUserId } from '../../selectors/user';

interface Props {
    lang: string;
    logout: LogoutAction;
    setLanguage: SetAction;
    userId?: string;
}

const mapStateToProps = (state: State) => ({
    lang: getLang(state),
    userId: getUserId(state),
});

const mapDispatchToProps = {
    logout: logoutAction,
    setLanguage: (lang: string) => set(lang),
};

class TopNav extends Component<Props, unknown> {
    render() {
        const {
            lang,
            setLanguage,
            logout,
            userId,
        } = this.props;

        const languages = process.env.REACT_APP_LANGUAGES?.split('|') || [];

        return (
            <Navbar bg="light" expand="lg">
                <LinkContainer to="/"><Navbar.Brand>{process.env.REACT_APP_WEBSITE_NAME}</Navbar.Brand></LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {languages.length > 1 && (
                            <NavDropdown alignRight title="Language" id="basic-nav-dropdown">
                                {languages.map((language) => (
                                    <NavDropdown.Item
                                        key={language}
                                        active={lang === language}
                                        onClick={() => setLanguage(language)}
                                    >
                                        {language.toUpperCase()}
                                    </NavDropdown.Item>
                                ))}
                            </NavDropdown>
                        )}
                        {userId && (
                            <NavDropdown alignRight title="Account" id="basic-nav-dropdown">
                                <LinkContainer to="/settings" activeClassName="">
                                    <NavDropdown.Item active={false}>
                                        <FormattedMessage id="settings" />
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logout}>
                                    <FormattedMessage id="logout" />
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);
