import { Meteor } from 'meteor/meteor';
import { Files } from '../imports/collections';

Meteor.startup(() => {
  Meteor.publish('files.public', () => {
    return Files.find({});
  });
});
