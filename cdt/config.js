module.exports = {
  upstream: "https://chinadigitaltimes.net",
  port:process.env.port || '1987',
  host: process.env.host || '127.0.0.1',
  enableAppcache:true,
  enableShareWidget:true,
  rankVisitors:true,
  allowHosts:[
    //'docs.google.com',
    //'ssl.gstatic.com',
    'hu.luo.bo',
    'pao-pao.net',
    'www.youtube.com',
    'apis.google.com',
    'fonts.googleapis.com',
    'platform.twitter.com',
    'v3.jiathis.com',
    'id.jiathis.com'
  ],
  // override this in `config.json`
  //mirrorLinksFile: "https://centrice-api-server/domains/cdt/",
  mirrorCollectionLinks: [
    "https://github.com/greatfire/wiki",
    "https://bitbucket.org/greatfire/wiki"
  ],
  gaTrackingID: "UA-26222920-7"
}
