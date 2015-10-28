#!/usr/bin/env python
# -*- coding: UTF-8 -*-
import time,urllib,re,random
from termcolor import colored

azure_sites_file = './azure_sites.txt'

TEST_URL = 'https://%s.azurewebsites.net/-proxite-/status?r=%s'

def main():
  azure_sites = re.split('\\s+',open(azure_sites_file).read().strip())
  results = []

  for domain in azure_sites:
    start = time.time()
    f = urllib.urlopen(TEST_URL % (domain,random.random()))
    f.read()
    t = time.time() - start
    code = f.getcode()
    if code==200:
      color = 'green'
    else:
      color = 'red'

    print colored("%10s:%4ds,Status:%d" % (domain,t,code),color)


if __name__ == '__main__':
  main()
