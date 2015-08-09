var Site, WeedProxite, argv, host, misc, port, site;

WeedProxite = require('WeedProxite');

Site = WeedProxite.Site;

misc = WeedProxite.misc;


/*
 *    Run as `node main.js localhost 1984`
 **/

if (require.main === module) {
  argv = process.argv;
  host = argv[2];
  port = argv[3];
}

host || (host = process.env.host);

port || (port = process.env.port);

site = new Site(__dirname);


if (site.config.showJiathis) {
  enableSocialShare = require('WeedProxite/lib/middlewares/enableSocialShare');
  enableSocialShare(site);
}

replaceBody = require('WeedProxite/lib/middlewares/replaceBody');

site.use({
  mime:'text/html',
  after:replaceBody(
          ['https:\\/\\/chinadigitaltimes.net\\/','/https-colon-//chinadigitaltimes.net/'],
          ['http:\\/\\/chinadigitaltimes.net\\/','/https-colon-//chinadigitaltimes.net/'],
          ['p+"://platform.twitter.com/widgets.js"','"/https-colon-//platform.twitter.com/widgets.js"']
        )
});


site.use({
  host:'platform.twitter.com',
  before:function (req,res) {
    res.writeHead(200,{'Content-Type':'text/javascript'});
    res.end('/*Disable Twitter JS*/');
  }
})

site.use({
  host:'www.youtube.com',
  before:function (req,res) {
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end('Youtube Disabled');
  }
})




site.useDefault();

site.run(host, port);

module.exports = site;
