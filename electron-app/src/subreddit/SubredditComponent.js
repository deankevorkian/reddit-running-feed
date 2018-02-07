/* @flow */

import React, {Component} from 'react';
import SubmissionComponent from './SubmissionComponent';

import InfiniteScroll from 'react-infinite-scroller';

import './SubredditComponent.css';

import { Post } from '../core/reddit/Post';

import SubredditService from '../core/reddit/SubredditService';
import snoowrap from 'snoowrap';

type Props = {
  subreddit: string,
  agent: snoowrap
};

type State = {
  posts: Post[],
  hasMoreItems : boolean
};

const loader = (<div className="loader" key={0}>Loading ...</div>);

export default class SubbredditComponent extends Component<Props, State> {
  state: State;
  agentFactory: SubredditService;

  constructor(props: Props) {
    super(props);
    this.state = {
      posts: [],
      hasMoreItems : true
    };
  }

  getPosts(fetchAfter : ?string = null) : Promise<Post[]> {
    return this.props.agent.getHot(this.props.subreddit, {after: fetchAfter}).then(submissions => {
      let posts : Post[] = submissions.map(submission => {
        return {
          submissionId: submission.id,
          author: submission.author.name,
          title: submission.title,
          upvotes: submission.ups,
          downvotes: submission.downs,
          gold: submission.gilded,
          thumbnailUrl: submission.thumbnail,
          thumbnailHeight: submission.thumbnail_height,
          thumbnailWidth: submission.thumbnail_width,
          url: submission.url
        }
      });

      return Promise.resolve(posts);
    });
  }

  fetchData() {
    let currPosts = this.state.posts;
    let currPostsCount = currPosts.length;
    let fetchAfter = currPostsCount > 0 ? "t3_" + currPosts[currPostsCount - 1].submissionId : null;
    this.getPosts(fetchAfter).then(fetchedPosts => {
      let mergedPosts : Post[] = currPosts.concat(fetchedPosts);
      this.setPosts(mergedPosts);
    });
  }

  setPosts(posts : Post[]) {
    this.setState(({
      posts: posts
    }));
  }

  loadItems(page : number) {
      this.fetchData();
    }

  render() {
    let items = [];
    this.state.posts.map(post => {
      items.push(
        <SubmissionComponent submission={post} key={post.submissionId} />
      )});

    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={(page) => this.loadItems(page)}
        hasMore={this.state.hasMoreItems}
        loader={loader}
        useWindow={false}>

        <div key="items" className="tracks">
          {items}
        </div>
      </InfiniteScroll>
    );
  }
}
