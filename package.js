Package.describe({
  name: 'jimmiebtlr:like',
  version: '0.0.3',
  summary: 'Add likes behavior for jagi:astronomy. (Not through standard behaviors though)',
  git: 'https://github.com/jimmiebtlr/meteor-likes',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3');
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
