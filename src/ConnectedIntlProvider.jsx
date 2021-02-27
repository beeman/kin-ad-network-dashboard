import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';

function mapStateToProps(state) {
    const { lang, messages } = state.locales;
    return { locale: lang, messages };
}

export default connect(mapStateToProps)(IntlProvider);
