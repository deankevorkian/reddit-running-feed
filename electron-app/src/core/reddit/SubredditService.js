/* @flow */

import snoowrap from 'snoowrap';
import { Post } from './Post';

export default class SubredditService {
  redditAgent: snoowrap;
  isInitialized: boolean;

  constructor() {
    this.setAgent();
  }

  setAgent() {
    // Get the `code` querystring param (assuming the user was redirected from reddit)
    var code = new URL(window.location.href).searchParams.get('code');

    if (code) {
      snoowrap.fromAuthCode({
        code: code,
        userAgent: 'My app',
        clientId: 'B9MiM6YU7XRzmA',
        redirectUri: 'http://localhost:3000/'
      }).then(r => {
        // Now we have a requester that can access reddit through the user's account
        this.redditAgent = r;
        isInitialized = true;
      });
    }
    else {
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
  }

  GetPosts(subName : string)/*: Post[]*/ {
    /*let post: Post = {
      author : "dindin",
      content : "i have crippling depression",
      downvotes : 0,
      upvotes : 15000,
      gold : 1,
      title : "i have osteopherosis"
    };

    return [post];*/

    this.redditAgent.getHot().then(posts => {
      posts.map((post) => {
        console.log(post.title);
        return post;
      });
    })
  }

}
