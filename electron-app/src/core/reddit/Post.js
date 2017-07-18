/* @flow */

export interface Post {
  submissionId: number;
  author: string;
  title: string;
  upvotes: number;
  downvotes: number;
  gold: number;
  thumbnailUrl: string;
  thumbnailHeight: number;
  thumbnailWidth: number;
  url: string;
}
