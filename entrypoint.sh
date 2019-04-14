#!/bin/bash

npm i

pm2 start "npm start"

# Keep container alive
tail -f /dev/null
