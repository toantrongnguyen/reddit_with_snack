#!/bin/bash

sudo git pull origin master

sudo docker-compose down
sudo docker-compose build
sudo docker-compose up -d
