export default {

  resetViewer({ LocalState }) {
    LocalState.set('viewer', {
      curPage: 1,
    });
  },

  nextPage({ LocalState }) {
    const viewer = LocalState.get('viewer');
    LocalState.set('viewer', {
      ...viewer,
      curPage: viewer.curPage + 1,
    });
  },

  prevPage({ LocalState }) {
    const viewer = LocalState.get('viewer');
    if (viewer.curPage == 1) return;
    LocalState.set('viewer', {
      ...viewer,
      curPage: viewer.curPage - 1,
    });
  },

  uploadFile({ LocalState, Collections }, e) {
    e.preventDefault();

    const { Files } = Collections;
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      const file = e.currentTarget.files[0];
      if (file) {
        let uploadInstance = Files.insert({
          file: file,
          streams: 'dynamic',
          chunkSize: 'dynamic',
          allowWebWorkers: true // If you see issues with uploads, change this to false
        }, false);

        LocalState.set('uploader', {
          ...LocalState.get('uploader'),
          uploadInstance,
          inProgress: true,
        });

        uploadInstance.on('uploaded', function (error, fileObj) {
          uploadInstance.uploaded = true;
          LocalState.set('uploader', {
            uploadInstance: null,
            progress: 0,
            inProgress: false,
          });
        });

        uploadInstance.on('progress', function (progress, fileObj) {
          if (!uploadInstance.uploaded) {
            LocalState.set('uploader', {
              ...LocalState.get('uploader'),
              progress
            });
          }
        });

        uploadInstance.start(); // Must manually start the upload
      }
    }
  }
}
