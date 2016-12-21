import React from 'react';
import { mount } from 'react-mounter';

import MainLayout from './components/MainLayout';
import AllFilesPage from './components/AllFilesPage';
import ViewPdfPage from './containers/ViewPdfPage';

export default function (injectDeps, { FlowRouter, LocalState }) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/', {
    name: 'home',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<AllFilesPage />)
      });
    }
  });

  FlowRouter.route('/view/:fileId', {
    name: 'view',
    action({ fileId }) {
      mount(MainLayoutCtx, {
        content: () => (<ViewPdfPage fileId={fileId} />)
      });
    }
  });
}
