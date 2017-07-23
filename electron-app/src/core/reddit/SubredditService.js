/* @flow */

import snoowrap from 'snoowrap';

const appUserAgent: string = "Reddit Running Feed";
const appClientId: string = "B9MiM6YU7XRzmA";
const appClientSecret: string = "";
const redirectUri: string = "http://localhost:3000/";
const locStorRefTokKey: string = "user_refresh_token";
const permissionsScope: string[] = ['identity', 'wikiread', 'wikiedit', 'read', 'mysubreddits'];

export default class SubredditService {
  authCode: string;
  agent: snoowrap;
  userRefreshToken: ?string;

  constructor() {
    let userRefreshToken: ?string = localStorage.getItem(locStorRefTokKey);
    if (userRefreshToken) {
      this.userRefreshToken = userRefreshToken;
    }
    else {
      let code = new URL(window.location.href).searchParams.get('code');

      if (code) {
        this.authCode = code;
      }
      else {
        let authenticationUrl = snoowrap.getAuthUrl({
          clientId: appClientId,
          scope: permissionsScope,
          redirectUri: redirectUri,
          permanent: true,
          state: 'fe211bebc52eb3da9bef8db6e63104d3' // a random string, this could be validated when the user is redirected back
        });
        // --> 'https://www.reddit.com/api/v1/authorize?client_id=foobarbaz&response_type=code&state= ...'

        window.location = authenticationUrl; // send the user to the authentication url
      }
    }


  }

  getAgent() : Promise<snoowrap> {
    if (this.agent) {
      return Promise.resolve(this.agent);
    }
    else {
      if (this.userRefreshToken) {
        return this.createPromiseFromRefreshToken();
      }
      else if (this.authCode) {
        return snoowrap.fromAuthCode({
          code: this.authCode,
          userAgent: appUserAgent,
          clientId: appClientId,
          redirectUri: redirectUri
        }).then(snooAgent => {
          this.userRefreshToken = snooAgent.refreshToken;
          localStorage.setItem(locStorRefTokKey, snooAgent.refreshToken);
          console.log("VISITORS!");
        }).then(() => {
          return this.createPromiseFromRefreshToken();
        });
      }
      else {
        return Promise.reject("No auth code received. Authenticate via reddit first.");
      }
    }
  }

  createPromiseFromRefreshToken() : Promise<snoowrap> {
    return new Promise((resolve, reject) => {
      let agent = new snoowrap({
        userAgent: appUserAgent,
        clientId: appClientId,
        clientSecret: appClientSecret,
        refreshToken: this.userRefreshToken
      });

      if (agent) {
        this.agent = agent;
        resolve(this.agent);
      }
      else {
        reject("Failed to create agent.");
      }
    });
  }
}
