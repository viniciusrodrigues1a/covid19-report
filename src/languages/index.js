/* eslint-disable camelcase */
import en_US from './en_US';
import pt_BR from './pt_BR';

export default {
  US: { countryCode: 'US', ...en_US },
  BR: { countryCode: 'BR', ...pt_BR },
};
