FROM nginx:stable-alpine
RUN rm /etc/nginx/conf.d/*
COPY ./nginx/nginx.conf /etc/nginx/conf.d/
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]