// import { Mongo } from 'meteor/mongo';
//
// export const Files = new Mongo.Collection('files');

import { FilesCollection } from 'meteor/ostrio:files';

export const Files = new FilesCollection({
  collectionName: 'Files',
  storagePath: 'pdfs',
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload: function (file) {
    // Allow upload files under 50MB, and only in pdf formats
    if (file.size <= 50485760 && /pdf/i.test(file.extension)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 50MB';
    }
  }
});

if (Meteor.isClient) {
  Meteor.subscribe('files.public');
}

if (Meteor.isServer) {
  Meteor.publish('files.public', function () {
    return Files.find().cursor;
  });
}

Meteor.methods({
  'files.remove'(fileId) {
    const file = Files.findOne(fileId);
    Files.remove(fileId);
  }
})
