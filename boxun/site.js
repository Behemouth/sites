var Site, WeedProxite, main, misc;

WeedProxite = require('WeedProxite');

Site = WeedProxite.Site;

misc = WeedProxite.misc;

main = function(host, port) {
  var site;
  site = new Site(__dirname);

  site.use({
    host:'gae.caspion.com', // disable this script
    before:function (req,res) {
      res.writeHead(404,{"Content-Type":"text/javascript"});
      res.end('');
    }
  })

  site.run(host, port);
  return site;
};

exports.main = main;

if (require.main === module) {
  main();
}

