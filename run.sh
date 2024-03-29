#!/bin/bash 

# npm run electron &

tsc --watch --project ./custom-server/tsconfig.custom.server.json &
tsc --watch & 
wait