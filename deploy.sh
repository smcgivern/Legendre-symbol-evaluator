#!/bin/sh
rsync -r . seanmcgivern@tombstone.org.uk:~/domains/sean.mcgivern.me.uk/legendre-symbol-evaluator/ --exclude=deploy.sh --exclude=.git --exclude=test/
