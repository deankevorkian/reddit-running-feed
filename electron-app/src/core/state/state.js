// @flow
//import snoowrap from 'snoowrap';
const snoowrap = window.snoowrap;

export type AppState = {
  subredditsScrollSpot: Map<string, Object>;
  visitedSubsContent: Map<string, Object>;
  subreddits: string[];
  agent: snoowrap;
}
