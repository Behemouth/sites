var fs = require('fs');
module.exports = {
  upstream: "https://getlantern.org",
  showMirrorNotice:false,
  enableAppcache:true,
  allowHosts:[
    'v3.jiathis.com',
    'id.jiathis.com',
    "ui.getlantern.org",
    "lanternforum.greatfire.org"
  ],
  /*
  httpsOptions:{
    key:fs.readFileSync('/etc/apache2/ssl/CA.key'),
    cert:fs.readFileSync('/etc/apache2/ssl/CA.crt')
  },*/
  mirrorLinksFile: "./alt_base_urls.txt",
  mirrorCollectionLinks: [
    "https://github.com/greatfire/wiki",
    "https://bitbucket.org/greatfire/wiki"
  ]
};

