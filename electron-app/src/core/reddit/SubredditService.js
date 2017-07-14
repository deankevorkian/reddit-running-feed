/* @flow */
import { Post } from './Post';

export default class SubredditService {
  constructor() {

  }

  static GetPosts(subName : string): Post[] {
    let post: Post = {
      author : "dindin",
      content : "i have crippling depression",
      downvotes : 0,
      upvotes : 15000,
      gold : 1,
      title : "i have osteopherosis"
    };

    return [post];
  }

}
