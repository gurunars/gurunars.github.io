#!/bin/bash

set -eu

DOMAIN_NAME=gurunars.com

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

ORIGIN=$(git config remote.origin.url)
ORIGIN=${ORIGIN/https:\/\/github.com\//git@github.com:}
ORIGIN=${ORIGIN%/}

NAME=$(cat /dev/urandom | tr -cd 'a-f0-9' | head -c 32)

yarn build

mv build /tmp/${NAME}
cd /tmp/${NAME}
git init
git config user.email publisher@gurunars.com
git config user.name Publisher
git checkout -b gh-pages
touch .nojekyll
echo "${DOMAIN_NAME}" > CNAME
git add .
git commit -am init
git remote add origin ${ORIGIN}
git push origin gh-pages -f
rm -rf /tmp/${NAME}
