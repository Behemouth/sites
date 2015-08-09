var Site, WeedProxite, main, misc, argv, site, host, port;

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
site.use({
  mime: /javascript/i,
  host: /^getlantern\.org|ui\.getlantern\.org$/i,
  after:function (proxyRes,res,next,proxyReq,req) {
    proxyRes.withTextBody(function (err,body) {
      if (err) return next(err);
      // don't forget to call next()
      var hostname = req.host.split(':')[0];
      body = body.replace(
        '"s3.amazonaws.com":"MIRROR"',
        '"s3.amazonaws.com":"MIRROR","'+hostname+'":"MIRROR"'
      );
      body = body.replace(
        '"https://ui.getlantern.org/app/index.html"',
        '"./https-colon-//ui.getlantern.org/app/index.html"'
      );
      body = body.replace("COMETD_URL = loc && loc.protocol+'//'+loc.host+'/'+APP_MOUNT_POINT+'/'+COMETD_MOUNT_POINT",'COMETD_URL=loc && loc.protocol+"//"+loc.host+"/https-colon-//ui.getlantern.org/app/cometd"');
      body = body.replace(/\bhttps:\/\/lanternforum\.greatfire\.org\b/g,'/https-colon-//lanternforum.greatfire.org');
      proxyRes.body = body;
      next();
    });
  }
});


if (site.config.showJiathis) {
  enableSocialShare = require('WeedProxite/lib/middlewares/enableSocialShare');
  enableSocialShare(site);
}

site.useDefault();
site.run(host, port);

module.exports = site;

