#!/usr/bin/env python
# -*- coding: UTF-8 -*-
import sys,os,json,ftplib,re,requests
import os.path as path
from multiprocessing.dummy import Pool as TreadPool
from filelock import FileLock

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
  if len(args) > 4:
    dont_update_proxite = True

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
    update(site_root,azure_password,domain,i,dont_update_proxite)

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




def azure_exec(domain,password,cmd):
  azure_api = 'https://%s.scm.azurewebsites.net/api/command' % domain
  timeout = 600
  auth = ('wamcdt',password)
  response = requests.post(azure_api,json={'dir':'site\\wwwroot','command':cmd},auth=auth,timeout=timeout)
  if response.status_code != requests.codes.ok :
    response.raise_for_status()

  return True

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
  ./update-azure.py cdt azure_pass centrice_pass

""")



if __name__ == '__main__':
  main(sys.argv)
