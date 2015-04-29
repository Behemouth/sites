var Site, WeedProxite, main, misc, argv;

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
argv = process.argv;

/* Run as `node site.js localhost 8080` */
if (require.main === module) {  main(argv[2], argv[3]); }
