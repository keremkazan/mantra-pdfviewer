import actions from './actions';
import routes from './routes';

export default {
  routes,
  actions,
  load(context) {
    const { LocalState } = context;
    const { files } = actions;
    const { resetViewer } = files;
    LocalState.set('uploader', {});
    resetViewer(context);
  }
};
