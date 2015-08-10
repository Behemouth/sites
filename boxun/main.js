var Site, WeedProxite, main, misc, argv, host, port;

WeedProxite = require('WeedProxite');

Site = WeedProxite.Site;

misc = WeedProxite.misc;

if (require.main === module) {
  argv = process.argv;
  host = argv[2];
  port = argv[3];
}

host || (host = process.env.host);

port || (port = process.env.port);

var site = new Site(__dirname);

site.use({
  host:'gae.caspion.com', // disable this script
  before:function (req,res) {
    res.writeHead(404,{
      "Content-Type":"text/javascript",
      "Cache-Control":"max-age=60000"
    });
    res.end('');
  }
});

if (site.config.enableShareWidget) {
  enableShareWidget = require('WeedProxite/lib/middlewares/enableShareWidget');
  enableShareWidget(site);
}

site.useDefault();


site.run(host, port);

module.exports = site;



