import i18next from 'i18next';

import { getItem } from '../utils/storage';
import lsKeys from '../constants/local_storage_keys';
import locales from '../constants/locales';

import en from './en.json';
import sq from './sq.json';

const selectedLanguage = getItem(lsKeys.SELECTED_LANGUAGE) || locales.ENGLISH;

i18next.init({
  interpolation: { escapeValue: false },
  lng: selectedLanguage,
  resources: { en, sq },
});

export default i18next;
