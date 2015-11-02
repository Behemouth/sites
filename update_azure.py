#!/usr/bin/env python
# -*- coding: UTF-8 -*-
import sys,os,json,ftplib,re,requests
import os.path as path
from multiprocessing.dummy import Pool as TreadPool

# https://urllib3.readthedocs.org/en/latest/security.html#insecureplatformwarning
import urllib3
urllib3.disable_warnings()

AZURE_API_MAX_RETRY = 4
SITES_ROOT = os.path.dirname(os.path.realpath(__file__))

failed_log = './azure_failed.txt'
azure_sites_file = './azure_sites.txt'
failed_sites = []

def main(args):
  if len(args) < 4:
    help()
    sys.exit(1)

  site_id = args[1]
  azure_password = args[2]
  centrice_vip_password = args[3]

  dont_update_proxite = False
  upstream = None
  if len(args) > 4:
    dont_update_proxite = True
    upstream = args[4]

  site_root = path.join(SITES_ROOT,site_id)

  if not path.isdir(site_root):
    print("Site [%s] does not exist!" % site_id)
    sys.exit(1)

  config = {
    "rankVisitors": True,
    "mirrorLinksFile":"https://vip:%s@m999.greatfire.org/domains/cdt/" % centrice_vip_password
  }

  with file(path.join(site_root,'config.json'),'wb') as config_file:
    json.dump(config,config_file,indent=2)

  if not path.isfile(azure_sites_file):
    print("Site list file %s does not exist!" % azure_sites_file)

  azure_sites = re.split('\\s+',open(azure_sites_file).read().strip())
  total = len(azure_sites)
  print("Total %d sites to update." % total)

  def doUpdate(t):
    i,domain = t
    update_old(site_root,azure_password,domain,i,upstream)
    # update(site_root,azure_password,domain,i,dont_update_proxite)

  pool = TreadPool(16)
  pool.map(doUpdate, enumerate(azure_sites))
  pool.close()
  pool.join()

  with open(failed_log,'wb') as f:
    f.write(" ".join(failed_sites))
    f.write("\n")


def update(site_root,password,domain,i,dont_update_proxite):
  print("\nUpdating site %d:%s" % (i,domain))
  uploadDir(
    localPath = site_root,
    remotePath = 'site/wwwroot',
    server = 'waws-prod-hk1-003.ftp.azurewebsites.windows.net',
    username =  domain + '\wamcdt',
    password = password
  )
  if dont_update_proxite:
    print("\nQuick done site %d:%s" % (i,domain))
    return


  for k in xrange(0,AZURE_API_MAX_RETRY):
    try:
      cmd = "npm install --production git+https://github.com/Behemouth/WeedProxite.git"
      azure_exec(domain, password,cmd)

      cmd = "./node_modules/.bin/proxite init"
      azure_exec(domain, password,cmd)
      print("\nDone site %d:%s" % (i,domain))
      return
    except requests.exceptions.RequestException,e:
      print("Failed %d times, site %d:%s" % (k+1,i,domain))
      print(e.message)
      continue

  failed_sites.append(domain)

server_js_tpl = """
var httpProxy = require('http-proxy'),
    KeepAliveAgent = require('agentkeepalive');

var proxy = httpProxy.createServer({
  target: "%s",
  changeOrigin: true,
  xfwd: true,
  agent: new KeepAliveAgent()
});
proxy.on('error', function (e) { console.error(e); });

var port = process.env.port || 8000;
console.info('listening on port', port);
proxy.listen(port);
"""

package_json = """
{
  "name": "AzureProxy",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "http-proxy": "^1.9.0",
    "agentkeepalive": "^2.0.0"
  }
}
"""

web_config = """
<configuration>
  <system.webServer>
    <handlers>
      <add name="iisnode" path="server.js" verb="*" modules="iisnode" />
    </handlers>
    <rewrite>
      <rules>
        <rule name="DynamicContent">
          <action type="Rewrite" url="server.js" />
        </rule>
      </rules>
    </rewrite>
    <iisnode watchedFiles="*.js;node_modules\\\\*;iisnode.yml" />
  </system.webServer>
</configuration>
"""

def update_old(site_root,password,domain,i,upstream):
  print("\nUpdating site %d:%s" % (i,domain))
  server_js = server_js_tpl % upstream

  open(site_root+'/server.js','wb').write(server_js)
  open(site_root+'/package.json','wb').write(package_json)
  open(site_root+'/web.config','wb').write(web_config)

  uploadFiles(fileNames = ['server.js','package.json','web.config'],
              localPath = site_root,
              server = 'waws-prod-hk1-003.ftp.azurewebsites.windows.net',
              username =  domain + '\wamcdt',
              password = password)


  for k in xrange(0,AZURE_API_MAX_RETRY):
    try:
      cmd = "npm install"
      azure_exec(domain, password,cmd)
      print("\nDone site %d:%s" % (i,domain))
      return
    except requests.exceptions.RequestException,e:
      print("Failed %d times, site %d:%s" % (k+1,i,domain))
      print(e.message)
      continue

  failed_sites.append(domain)


def azure_exec(domain,password,cmd):
  azure_api = 'https://%s.scm.azurewebsites.net/api/command' % domain
  timeout = 3000
  auth = ('wamcdt',password)
  response = requests.post(azure_api,json={'dir':'site\\wwwroot','command':cmd},auth=auth,timeout=timeout)
  if response.status_code != requests.codes.ok :
    response.raise_for_status()

  return True

def uploadFiles(fileNames,localPath,server,username,password):
  ftp = ftplib.FTP(server, username, password)
  ftp.cwd('site\\wwwroot')
  for fname in fileNames:
    fpath = path.join(localPath,fname)
    if path.isfile(fpath):
      fp = open(fpath, 'rb')
      ftp.storbinary('STOR %s' % fname, fp)
      fp.close()

  ftp.quit()

def uploadDir(localPath,remotePath,server,username,password):
  ftp = ftplib.FTP(server, username, password)
  ftp.cwd(remotePath)
  def doUpload(localDir):
    files = os.listdir(localDir)
    for fname in files:
      fpath = path.join(localDir,fname)
      if path.isfile(fpath):
        fp = open(fpath, 'rb')
        ftp.storbinary('STOR %s' % fname, fp)
        fp.close()
      elif path.isdir(fpath):
        ftp.mkd(fname)
        ftp.cwd(fname)
        doUpload(fpath)
        ftp.cwd('..')

  doUpload(localPath)
  ftp.quit()



def help():
  print("""
Usage:
  update-azure.py site_id azure_password centrice_vip_password dont_update_proxite

It will read azure website domains from './azure_sites.txt' file, which contains azure subdomain sep by space.
When [dont_update_proxite] presents,it will skip WeedProxite update

Example:
  echo "subdomain1 sub2 sub3" > azure_sites.txt
  ./update-azure.py cdt azure_passwd centrice_passwd

""")



if __name__ == '__main__':
  main(sys.argv)
