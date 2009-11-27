#!/bin/sh
haml -f html5 index.haml > index.html
sed -i 's/em>/i>/g' index.html
