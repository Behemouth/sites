var fs = require('fs');
module.exports = {
  upstream: "https://getlantern.org",
  host:'0.0.0.0',
  showMirrorNotice:false,
  enableAppcache:true,
  useMemcache:true,
  allowHosts:["ui.getlantern.org"],
  httpsOptions:{
    key:fs.readFileSync('/etc/apache2/ssl/CA.key'),
    cert:fs.readFileSync('/etc/apache2/ssl/CA.crt')
  },
  mirrorCollectionLinks: ["https://github.com/greatfire/wiki","https://bitbucket.org/greatfire/wiki"],
  mirrorLinks: [
    "https://mainlandproxy.net:1984/"
  ]
};

