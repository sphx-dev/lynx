#!/bin/bash

GREEN='\033[0;32m' # Green color
NC='\033[0m' # No Color

rm -rf .repos
mkdir -p .repos


echo -e "${GREEN}Downloading proto files from sphx-io/chain:${NC}"
#git clone --filter=blob:none --sparse git@github.com:sphx-io/chain.git .repos/chain
git clone --filter=blob:none git@github.com:sphx-io/proto-codecs.git .repos/proto-codecs
mv .repos/proto-codecs/src proto-codecs