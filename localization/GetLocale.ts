import * as Localization from 'expo-localization';

export const GetLocale = (): 'en' | 'ar-se' => {
  return Localization.locale.slice(0, 2) as 'en' | 'ar-se';
};

export default GetLocale;
