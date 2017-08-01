/* @flow */

import snoowrap from 'snoowrap';
import { AppSettings } from './app-settings';
import uuidv4 from 'uuid/v4';


export default class SubredditService {
  authCode: string;
  agent: snoowrap;
  userRefreshToken: ?string;

  constructor() {
    let userRefreshToken: ?string = localStorage.getItem(AppSettings.locStorRefTokKey);
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
          clientId: AppSettings.appClientId,
          scope: AppSettings.permissionsScope,
          redirectUri: AppSettings.redirectUri,
          permanent: true,
          state: uuidv4() // a random string, this could be validated when the user is redirected back
        });

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
          userAgent: AppSettings.appUserAgent,
          clientId: AppSettings.appClientId,
          redirectUri: AppSettings.redirectUri
        }).then(snooAgent => {
          this.userRefreshToken = snooAgent.refreshToken;
          localStorage.setItem(AppSettings.locStorRefTokKey, snooAgent.refreshToken);
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
        userAgent: AppSettings.appUserAgent,
        clientId: AppSettings.appClientId,
        clientSecret: AppSettings.appClientSecret,
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
