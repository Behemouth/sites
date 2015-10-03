
module.exports = {
  upstream: "https://getlantern.org",
  port: process.env.port || '1985',
  host: process.env.host || '127.0.0.1',
  showMirrorNotice:false,
  enableAppcache:true,
  enableShareWidget:true,
  allowHosts:[
    'v3.jiathis.com',
    'id.jiathis.com',
    "ui.getlantern.org",
    "lanternforum.greatfire.org"
  ],
  // override it in `config.json`
  //mirrorLinksFile: "https://centrice-api/domains/lantern/"
  mirrorCollectionLinks: [
    "https://github.com/greatfire/wiki",
    "https://bitbucket.org/greatfire/wiki"
  ]
};

