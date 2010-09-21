#!/bin/sh
rsync -r . seanmcgivern@tombstone.org.uk:~/domains/sean.mcgivern.me.uk/legendre/ --exclude=deploy.sh --exclude=.git