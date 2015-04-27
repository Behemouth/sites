var Site, WeedProxite, main, misc;

WeedProxite = require('WeedProxite');

Site = WeedProxite.Site;

misc = WeedProxite.misc;

main = function(host, port) {
  var site;
  site = new Site(__dirname);
  site.run(host, port);
  return site;
};

exports.main = main;

if (require.main === module) {
  main();
}

