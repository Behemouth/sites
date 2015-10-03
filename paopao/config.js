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
  // override this in `config.json`
  // mirrorLinksFile: "https://localhost/domains/paopao/"
  mirrorCollectionLinks: [
    "https://github.com/greatfire/wiki",
    "https://bitbucket.org/greatfire/wiki"
  ]
}

