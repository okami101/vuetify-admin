ARG APP_ENV=production
FROM nginx:alpine

COPY conf.d/${APP_ENV}.conf /etc/nginx/conf.d/

EXPOSE 80
