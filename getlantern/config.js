var fs = require('fs');
module.exports = {
  upstream: "https://getlantern.org",
  showMirrorNotice:false,
  enableAppcache:true,
  allowHosts:[
    "ui.getlantern.org",
    "lanternforum.greatfire.org"
  ],
  httpsOptions:{
    key:fs.readFileSync('/etc/apache2/ssl/CA.key'),
    cert:fs.readFileSync('/etc/apache2/ssl/CA.crt')
  },
  mirrorCollectionLinks: [
    "https://github.com/greatfire/wiki",
    "https://bitbucket.org/greatfire/wiki"
  ],
  mirrorLinks: [
    "https://localhost:1984/"
  ]
};

