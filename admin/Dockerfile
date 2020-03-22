FROM node:lts-alpine

WORKDIR /usr/src/admin

# Prevent the reinstallation of node modules at every changes in the source code
COPY package.json yarn.lock ./

RUN yarn

COPY . ./

ARG APP_ENV=production

RUN if [ "$APP_ENV" = "production" ]; then \
    yarn build; \
  else \
    yarn serve; \
  fi
