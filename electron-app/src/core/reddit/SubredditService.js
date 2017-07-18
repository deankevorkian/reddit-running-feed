/* @flow */

import snoowrap from 'snoowrap';

export default class SubredditService {
  authCode: string;

  constructor() {
    let code = new URL(window.location.href).searchParams.get('code');

    if (code === null || code === undefined) {
      let authenticationUrl = snoowrap.getAuthUrl({
        clientId: 'B9MiM6YU7XRzmA',
        scope: ['identity', 'wikiread', 'wikiedit', 'read'],
        redirectUri: 'http://localhost:3000/',
        permanent: true,
        state: 'fe211bebc52eb3da9bef8db6e63104d3' // a random string, this could be validated when the user is redirected back
      });
      // --> 'https://www.reddit.com/api/v1/authorize?client_id=foobarbaz&response_type=code&state= ...'

      window.location = authenticationUrl; // send the user to the authentication url
    }
    else {
      this.authCode = code;
    }
  }

  getAgent() : Promise<any> {
    if (this.authCode) {
      return snoowrap.fromAuthCode({
        code: this.authCode,
        userAgent: 'My app',
        clientId: 'B9MiM6YU7XRzmA',
        redirectUri: 'http://localhost:3000/'
      });
      /*.then(r => {
        // Now we have a requester that can access reddit through the user's account
        this.redditAgent = r;
        this.isInitialized = true;
      });*/
    }
    else {
      return Promise.reject("No auth code received. Authenticate via reddit first.");
    }
  }
}
