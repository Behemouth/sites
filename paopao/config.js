module.exports = {
  upstream: "https://pao-pao.net/",
  port:process.env.port || '1984',
  host: process.env.host || '127.0.0.1',
  enableAppcache:true,
  enableShareWidget:true,
  allowHosts:[
    'rest-production.mollom.com',
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

