FROM ubuntu:14.04

RUN apt-get update && \
    apt-get -y install nodejs npm && \
    npm -g install geoip-lite express
    #npm run-script updatedb
