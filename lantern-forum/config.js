
module.exports = {
  upstream: "https://lanternforum.greatfire.org",
  port: process.env.port || '1983',
  host: process.env.host || '127.0.0.1',
  showMirrorNotice:true,
  enableAppcache:true,
  showJiathis:true,
  allowHosts:[
     'v3.jiathis.com',
     'id.jiathis.com'
  ],
  mirrorCollectionLinks: [
    "https://github.com/greatfire/wiki",
    "https://bitbucket.org/greatfire/wiki"
  ],
  mirrorLinksFile: "./alt_base_urls.txt"
};
