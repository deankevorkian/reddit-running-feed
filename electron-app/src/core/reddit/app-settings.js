/* @flow */

const appUserAgent: string = "Reddit Running Feed";
const appClientId: string = "B9MiM6YU7XRzmA";
const appClientSecret: string = "";
const redirectUri: string = "http://localhost:3000/";
const locStorRefTokKey: string = "user_refresh_token";
const permissionsScope: string[] = ['identity', 'wikiread', 'wikiedit', 'read', 'mysubreddits'];

const AppSettings = {
  appUserAgent,
  appClientId,
  appClientSecret,
  redirectUri,
  locStorRefTokKey,
  permissionsScope
};

export { AppSettings };
