/* eslint-disable camelcase */
import en_US from './en_US';
import pt_BR from './pt_BR';

export default {
  US: { countryCode: 'US', languageName: 'English', ...en_US },
  BR: { countryCode: 'BR', languageName: 'Brazilian Portugese', ...pt_BR },
};
