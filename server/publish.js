import { Likes } from '../like.js';

Meteor.publish('likes/owned', function likesOwnedPub() {
  return Likes.find({ userId: this.userId });
});
