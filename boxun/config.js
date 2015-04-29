
var fs = require('fs');
module.exports = {
  upstream: "http://boxun.com",
  upstreamDefaultCharset: "GBK",
  host:'0.0.0.0',
  showMirrorNotice:true,
  enableAppcache:true,
  allowHosts:[
      'blog.boxun.com',
      'boxunclub.com',
      'en.boxun.com',
      'gae.caspion.com',
      'caspionlog.appspot.com',
      'news.boxun.com',
      'www.boxunclub.com',
      'www.google.com',
      'www.gstatic.com',
      'boxunnews.disqus.com',
      'storage.googleapis.com',
      'www.googletagadservices.com',
      'www.toshop.net'
  ],
  httpsOptions:{
    key:fs.readFileSync('/etc/apache2/ssl/CA.key'),
    cert:fs.readFileSync('/etc/apache2/ssl/CA.crt')
  },
  mirrorLinksFile: "./alt_base_urls.txt",
  mirrorCollectionLinks: ["https://github.com/greatfire/wiki","https://bitbucket.org/greatfire/wiki"],
  mirrorLinks: []
};
