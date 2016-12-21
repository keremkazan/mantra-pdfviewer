import actions from './actions';
import routes from './routes';

export default {
  routes,
  actions,
  load(context) {
    const { LocalState } = context;
    LocalState.set('uploader', {});
  }
};
