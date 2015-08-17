## How to use

1. Follow WeedProxite installation document: https://github.com/Behemouth/WeedProxite

2. Edit `config.js`, remember to change `mirrorLinks` or `mirrorLinksFile`:

  ```javascript
  // var fs = require("fs");
  module.exports = {
    upstream: "http://example.com",
    showMirrorNotice:false,
    allowHosts:[
      "sub.example.com",
      "blog.example.com"
    ],
    /*
    httpsOptions:{
      key:fs.readFileSync('/etc/apache2/ssl/CA.key'),
      cert:fs.readFileSync('/etc/apache2/ssl/CA.crt')
    },
    */
    mirrorCollectionLinks: [
      "https://github.com/greatfire/wiki",
      "https://bitbucket.org/greatfire/wiki"
    ],
    mirrorLinksFile: "./alt_base_urls.txt"
  };

  ```

3. Advanced usage of `main.js`, use middleware to modify response:

  ```javascript
  var Site, WeedProxite;
  WeedProxite = require('WeedProxite');
  Site = WeedProxite.Site;
  var site;
  site = new Site(__dirname);
  site.use({
    mime: /javascript/i,
    before:function (proxyRes,res,next,proxyReq,req) {
      // Don't forget to call next() if it doesn't end response
      res.end("/* disable all javascript */");
    }
  });
  site.useDefault(); // use default proxy rewriter middlewares
  site.run(host, port);
  ```

  **Don't forget to call `next()`!**

  More options please see `WeedProxite/lib/Middleware.coffee`.



### How to deploy on Azure Websites

1. Upload all files under site directory to Azure Websites `site/webroot` via FTP.

2. Install WeedProxite on Azure Websites web root.
  ```
  http --timeout 300000 -a username:password POST https://{your-sub-domain}.scm.azurewebsites.net/api/command  dir='site\\wwwroot'  command="npm install --production git+https://github.com/Behemouth/WeedProxite.git"
  ```

3. Init site:
  ```
  http --timeout 300000 -a username:password POST https://{your-sub-domain}.scm.azurewebsites.net/api/command  dir='site\\wwwroot'  command="./node_modules/.bin/proxite init"
  ```

4. Done
