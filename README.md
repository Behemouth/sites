## How to deploy

1. Install WeedProxite first.
2. Create your mirror site:

  ```
  mkdir my-mirror;
  cd my-mirror;
  proxite init;
  ```

  Or copy from other sites.

3. Edit `config.js`, remember to change `mirrorLinks` or `mirrorLinksFile`:

  ```javascript
  var fs = require('fs');
  module.exports = {
    upstream: "http://example.com",
    showMirrorNotice:false,
    allowHosts:[
      "sub.example.com",
      "blog.example.com"
    ],
    httpsOptions:{
      key:fs.readFileSync('/etc/apache2/ssl/CA.key'),
      cert:fs.readFileSync('/etc/apache2/ssl/CA.crt')
    },
    mirrorCollectionLinks: [
      "https://github.com/greatfire/wiki",
      "https://bitbucket.org/greatfire/wiki"
    ],
    mirrorLinksFile: "./alt_base_urls.txt"
  };

  ```

4. Advance usage of `site.js`, use middleware to modify response:

  ```javascript
  var Site, WeedProxite,argv;
  WeedProxite = require('WeedProxite');
  Site = WeedProxite.Site;
  function main(host, port) {
    var site;
    site = new Site(__dirname);
    site.use({
      mime: /javascript/i,
      host: "*",
      after:function (proxyRes,res,next,proxyReq,req) {
        if (!proxyRes.body) return next();
        proxyRes.body = "/* disable all javascript */"
        // Don't forget to call next()
        next();
      }
    });
    site.run(host, port);
    return site;
  };

  exports.main = main;
  argv = process.argv;

  /* Run as `node site.js localhost 8080` */
  if (require.main === module) {  main(argv[2], argv[3]); }
  ```

  **Don't forget to call `next()`!**

  More options please see `WeedProxite/lib/Middleware.coffee`.

