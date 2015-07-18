var Site, WeedProxite, main, misc, argv;

WeedProxite = require('WeedProxite');

Site = WeedProxite.Site;

misc = WeedProxite.misc;

main = function(host, port) {
  var site;
  site = new Site(__dirname);

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

  site.useDefault();


  site.run(host, port);
  return site;
};


module.exports = main;
argv = process.argv;

/* Run as `node site.js localhost 8080` */
if (require.main === module) {  main(argv[2], argv[3]); }
