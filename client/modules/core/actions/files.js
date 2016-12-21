export default {
  create({ Meteor, FlowRouter }, name) {
    Meteor.call('files.insert', name, (err, result) => {
      FlowRouter.go(`/file/${result}`);
    });
  },
}
