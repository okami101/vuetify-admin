FROM nginx:alpine

ARG APP_ENV=production
COPY conf.d/${APP_ENV}.conf /etc/nginx/conf.d/

RUN rm /etc/nginx/conf.d/default.conf

EXPOSE 80
