## How to deploy

1. Install or update WeedProxite first.
2. Create your new mirror site,or copy from existing sites:

  ```
  mkdir my-mirror;
  cd my-mirror;
  proxite init;
  ```

3. Edit `config.js`, remember to change `mirrorLinks` or `mirrorLinksFile`:

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

4. Advanced usage of `main.js`, use middleware to modify response:

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

1. Install or update WeedProxite on your local machine.

2. Run `proxite init` under local site directory, it will generate files like `package.json`、`web.config`、`static/bundle.js`.

3. Upload all files under site directory to Azure Websites web root.

4. You'd better to upgrade npm to 3.x to avoid too deep nested node_modules problem on Windows.
  ```
  sudo apt-get install httpie
  # But it doesn't work, Azure sucks
  http --timeout 300000 -a username:password POST https://{your-sub-domain}.scm.azurewebsites.net/api/command  dir='site\\wwwroot'  command="npm install npm@3.x.x -g"
  ```

5. Execute command `npm install --production` on Azure Websites web root.
  ```
  http --timeout 300000 -a username:password POST https://{your-sub-domain}.scm.azurewebsites.net/api/command  dir='site\\wwwroot'  command="npm install --production"
  ```

6. Done.
