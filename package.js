Package.describe({
  name: 'jimmiebtlr:like',
  version: '0.0.1',
  summary: '',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3-rc.10');
  api.use([
    'ecmascript',
    'mongo',
    'jagi:astronomy@1.2.10',
    'matb33:collection-hooks@0.8.1',
  ]);

  api.addFiles('client/subscribe.js','client');
  api.addFiles('server/publish.js','server');

  api.mainModule('like.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('jimmiebtlr:like');
  api.addFiles('like-tests.js');
});