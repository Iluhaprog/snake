FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY ./dist/prod .

ENTRYPOINT ["nginx", "-g", "daemon off;"]