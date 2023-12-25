export const {
  APP_ENV = 'dev',
  PORT = 4000,

  // DB_HOST = 'localhost',
  // DB_PORT = '5432',
  // DB_NAME = 'digisat',
  // DB_USERNAME = 'postgres',
  // DB_PASSWORD = '123456789wwE#',

  REFRESH_TOKEN_EXPIRY = 5184000, //  60 * 60 * 24 * 60 => 60 days
  ACCESS_TOKEN_EXPIRY = 1800, // 60 * 30 => 30 minutes
  REFRESH_TOKEN_SECRECT = 'secret',
  ACCESS_TOKEN_SECRET = 'secret',

  MAIL_HOST = 'smtp-mail.outlook.com',
  MAIL_PORT = 587,
  MAIL_FROM = 'viralmargins3@outlook.com',
  MAIL_USER = 'viralmargins3@outlook.com',
  MAIL_PASS = '123456789wwe',

  SMS_FROM = '9742505311',
  SPARROW_TOKEN = 'v2_r9Ql0vsJuCahz9jCY6L1u2U40uJ.auVs',
  SPARROW_SMS_ENDPOINT = 'https://api.sparrowsms.com/v2/sms',

  WEB_URL = 'localhost:3000',
} = process.env;

// is prod
export const IS_PROD = APP_ENV === 'prod';

// full web url
export const FULL_WEB_URL = `${IS_PROD ? 'https://' : 'http://'}${WEB_URL}`;
