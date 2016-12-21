import React from 'react';
import { mount } from 'react-mounter';

import MainLayout from './components/MainLayout';
import AllFilesPage from './components/AllFilesPage';

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
}
