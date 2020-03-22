FROM node:lts-alpine

WORKDIR /srv/api/admin

# Prevent the reinstallation of node modules at every changes in the source code
COPY package.json yarn.lock ./

RUN yarn

COPY . ./

CMD yarn serve
