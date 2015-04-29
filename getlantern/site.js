var Site, WeedProxite, main, misc;

WeedProxite = require('WeedProxite');

Site = WeedProxite.Site;

misc = WeedProxite.misc;

main = function(host, port) {
  var site;
  site = new Site(__dirname);
  site.use({
    mime: /javascript/i,
    host: /^getlantern\.org|ui\.getlantern\.org$/i,
    after:function (proxyRes,res,next,proxyReq,req) {
      if (!proxyRes.body) return next(); // don't forget to call next()
      var hostname = (req.headers.host || '').split(':')[0]
      body = proxyRes.body;
      body = body.replace(
        '"s3.amazonaws.com":"MIRROR"',
        '"'+hostname+'":"MIRROR"'
      );
      body = body.replace(
        '"https://ui.getlantern.org/app/index.html"',
        '"./https://ui.getlantern.org/app/index.html"'
      );
      body = body.replace("COMETD_URL = loc && loc.protocol+'//'+loc.host+'/'+APP_MOUNT_POINT+'/'+COMETD_MOUNT_POINT",'COMETD_URL=loc && loc.protocol+"//"+loc.host+"/https://ui.getlantern.org/app/cometd"');
      body = body.replace(/\bhttps:\/\/lanternforum\.greatfire\.org\b/g,'/https://lanternforum.greatfire.org');
      proxyRes.body = body;
      next();
    }
  });
  site.run(host, port);
  return site;
};

exports.main = main;

if (require.main === module) {
  main();
}

