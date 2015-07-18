
var fs = require('fs');
module.exports = {
  upstream: "http://boxun.com",
  upstreamDefaultCharset: "GBK",
  port:1986,
  showMirrorNotice:true,
  enableAppcache:false,
  allowHosts:[
      'v3.jiathis.com',
      'id.jiathis.com',
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
  /*
  httpsOptions:{
    key:fs.readFileSync('/etc/apache2/ssl/CA.key'),
    cert:fs.readFileSync('/etc/apache2/ssl/CA.crt')
  },*/
  mirrorLinksFile: "./alt_base_urls.txt",
  //mirrorLinks: [],
  mirrorCollectionLinks: ["https://github.com/greatfire/wiki","https://bitbucket.org/greatfire/wiki"]
};
