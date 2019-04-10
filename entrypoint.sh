#!/bin/bash

npm i

npm run dev

# Keep container alive
tail -f /dev/null
