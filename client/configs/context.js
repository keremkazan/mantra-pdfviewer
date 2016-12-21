import * as Collections from '/imports/collections';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tracker } from 'meteor/tracker';

export default () => {
  const LocalState = new ReactiveDict();
  return {
    Meteor,
    FlowRouter,
    Collections,
    LocalState,
    Tracker,
  };
}
