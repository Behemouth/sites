
var Site, WeedProxite, argv, host, misc, port, site;

WeedProxite = require('WeedProxite');

Site = WeedProxite.Site;

misc = WeedProxite.misc;


/*
 Run as `node main.js localhost 1984`
 */

if (require.main === module) {
  argv = process.argv;
  host = argv[2];
  port = argv[3];
}

host || (host = process.env.host);

port || (port = process.env.port);

site = new Site(__dirname);

if (site.config.enableShareWidget) {
  enableShareWidget = require('WeedProxite/lib/middlewares/enableShareWidget');
  enableShareWidget(site);
}

site.useDefault();

site.run(host, port);


module.exports = site;
