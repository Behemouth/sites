
module.exports = {
  upstream: "http://boxun.com",
  upstreamDefaultCharset: "GBK",
  port:process.env.port || '1986',
  host: process.env.host || '127.0.0.1',
  showMirrorNotice:true,
  enableAppcache:true,
  enableShareWidget:true,
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
  //mirrorLinks: [],
  mirrorCollectionLinks: ["https://github.com/greatfire/wiki","https://bitbucket.org/greatfire/wiki"],
  mirrorLinksFile: "https://guest:guest@m999.greatfire.org/domains/boxun/"
};
