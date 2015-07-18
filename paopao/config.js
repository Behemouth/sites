module.exports = {
  upstream: "https://pao-pao.net",
  port:1984,
  enableAppcache:false,
  showJiathis:false,
  allowHosts:[
    'platform.twitter.com',
    'v3.jiathis.com',
    'id.jiathis.com'
  ],
  /*
  httpsOptions:{
    key:fs.readFileSync('/etc/apache2/ssl/CA.key'),
    cert:fs.readFileSync('/etc/apache2/ssl/CA.crt')
  },*/
  mirrorCollectionLinks: [
    "https://github.com/greatfire/wiki",
    "https://bitbucket.org/greatfire/wiki"
  ],
  mirrorLinksFile: "./alt_base_urls.txt"
};

