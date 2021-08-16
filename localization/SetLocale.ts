import 'moment/locale/ar-sa';

import i18n from 'i18n-js';
import moment from 'moment';

import {en} from './en';
import GetLocale from './GetLocale';
import {ar} from './ar';

export const SetLocale = (forceLocale?: string): void => {
  i18n.translations = {
    en: en,
    ar: ar,
  };
  i18n.fallbacks = true;
  const newLocale = forceLocale || GetLocale();
  i18n.locale = newLocale;
  moment.locale(newLocale);
};

export default SetLocale;
