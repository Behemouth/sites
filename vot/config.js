module.exports = {
  upstream: "http://www.vot.org",
  port:process.env.port || '1989',
  host: process.env.host || '127.0.0.1',
  enableAppcache:true,
  enableShareWidget:true,
  allowHosts:[
    'vot.org',
    'developer.android.com',
    'ajax.googleapis.com',
    'translate.google.com',
    'maxcdn.bootstrapcdn.com',
    'pingback.issuu.com',
    's.ytimg.com',
    'www.google.com',
    'www.youtube.com',
    'image.issuu.com',
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

