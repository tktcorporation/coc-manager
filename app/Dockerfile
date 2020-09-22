FROM centos/nodejs-10-centos7:latest

WORKDIR /app

COPY ./ ./

USER root

RUN yum update -y && yum install -y wget curl cronie

RUN curl -sL https://rpm.nodesource.com/setup_10.x | bash -

RUN yum install -y nodejs

RUN npm i -g typescript ts-node && npm i
