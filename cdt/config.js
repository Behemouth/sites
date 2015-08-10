module.exports = {
  upstream: "https://chinadigitaltimes.net",
  port:process.env.port || '1987',
  host: process.env.host || '127.0.0.1',
  enableAppcache:true,
  enableShareWidget:true,
  allowHosts:[
    //'docs.google.com',
    //'ssl.gstatic.com',
    'www.youtube.com',
    'apis.google.com',
    'fonts.googleapis.com',
    'platform.twitter.com',
    'v3.jiathis.com',
    'id.jiathis.com'
  ],
  mirrorCollectionLinks: [
    "https://github.com/greatfire/wiki",
    "https://bitbucket.org/greatfire/wiki"
  ],
  mirrorLinksFile: "./alt_base_urls.txt"
};

