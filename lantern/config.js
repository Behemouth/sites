
module.exports = {
  upstream: "https://getlantern.org",
  port: process.env.port || '1985',
  host: process.env.host || '127.0.0.1',
  showMirrorNotice:false,
  enableAppcache:true,
  ensureExternalLinkProtocol: 'auto',
  allowHosts:[
    'v3.jiathis.com',
    'id.jiathis.com',
    "ui.getlantern.org",
    "lanternforum.greatfire.org"
  ],
  mirrorLinksFile: "./alt_base_urls.txt",
  mirrorCollectionLinks: [
    "https://github.com/greatfire/wiki",
    "https://bitbucket.org/greatfire/wiki"
  ]
};

