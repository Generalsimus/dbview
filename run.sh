#!/bin/bash
npm run next:dev &
tsc --watch --project ./custom-server/tsconfig.custom.server.json &
tsc --watch &
wait