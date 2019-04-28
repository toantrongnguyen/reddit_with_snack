#!/bin/bash

cd /home/work/reddit_with_snack

sudo git pull origin master

sudo docker-compose restart node
