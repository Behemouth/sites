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

site.use({
  host:'pao-pao.net',
  path:'/vpn-compare',
  after:function (proxyRes,res,next,proxyReq,req) {
    if (!proxyRes.headers['content-type']) {
      proxyRes.headers['content-type']='text/html; charset=utf-8';
    }
    proxyRes.withTextBody(function (err,body) {
      if (err) return next(err);
      var re = /<script\b[^>]*>[^<]*\bvpnjson\b[^]+?<\/script>/i;
      body = body.replace(
        re,
        function (s) {
          s = s.replace(/\bhttps?:[\/\\]+pao-pao\.net[\\\/]+/ig,req.localConfig.mirrorLinks[0]);
          return s;
        }
      );
      proxyRes.body=body;
      next();
    });
  }
});

if (site.config.enableShareWidget) {
  enableShareWidget = require('WeedProxite/lib/middlewares/enableShareWidget');
  enableShareWidget(site);
}

site.useDefault();

site.run(host, port);

module.exports = site;
