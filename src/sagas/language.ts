import { call, put, takeEvery } from 'redux-saga/effects';
import { load, SET, Set } from '../actions/language';

function getMessages(lang: string) {
    // eslint-disable-next-line
    return require(`../translations/${lang}.json`);
}

function* initializeLanguage() {
    const lang = yield call([localStorage, 'getItem'], 'lang');

    const messages = getMessages(lang || 'en');
    yield put(load(lang, messages));
}

function* setLanguage({ payload }: Set) {
    const messages = getMessages(payload.lang);
    yield put(load(payload.lang, messages));
    yield call([localStorage, 'setItem'], 'lang', payload.lang);
}

export default function* () {
    yield call(initializeLanguage);

    yield takeEvery(SET, setLanguage);
}
