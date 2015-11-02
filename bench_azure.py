#!/usr/bin/env python
# -*- coding: UTF-8 -*-
import time,urllib2,re,random
from termcolor import colored

azure_sites_file = './azure_sites.txt'
failed_log = './azure_failed.txt'

TEST_URL = 'https://%s.azurewebsites.net/-proxite-/status?r=%s'

def main():
  azure_sites = re.split('\\s+',open(azure_sites_file).read().strip())
  results = []
  error_sites = []

  for domain in azure_sites:
    start = time.time()
    f = urllib2.urlopen(TEST_URL % (domain,random.random()))
    f.read()
    t = time.time() - start
    code = f.getcode()
    if code==200:
      color = 'green'
    else:
      color = 'red'
      error_sites.append(domain)

    print colored("%10s:%4ds,Status:%d" % (domain,t,code),color)

  with open(failed_log,'wb') as f:
    f.write(" ".join(error_sites))
    f.write("\n")


if __name__ == '__main__':
  main()
