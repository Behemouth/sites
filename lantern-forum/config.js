
var fs = require('fs');
module.exports = {
  upstream: "https://lanternforum.greatfire.org",
  //host:'0.0.0.0',
  showMirrorNotice:true,
  enableAppcache:true,
  allowHosts:[],
  httpsOptions:{
    key:fs.readFileSync('/etc/apache2/ssl/CA.key'),
    cert:fs.readFileSync('/etc/apache2/ssl/CA.crt')
  },
  mirrorCollectionLinks: [
    "https://github.com/greatfire/wiki",
    "https://bitbucket.org/greatfire/wiki"
  ],
  mirrorLinksFile: "./alt_base_urls.txt"
};
