/* @flow */

const appUserAgent: string = "Reddit Running Feed";
const appClientId: string = "Nx35IUdmyK8YWg";
const appClientSecret: string = "";
const redirectUri: string = "https://reddit-running-feed.azurewebsites.net/";
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
