FROM alpine:3.18

ARG CERTIFICATE_PATH
ARG VALUE

RUN apk update && \
    apk add nginx openssl

COPY ./conf/frontend.conf /etc/nginx/http.d/frontend.conf
COPY ./tools/script.sh /init_script.sh

RUN chmod +x /init_script.sh && \
    /init_script.sh && \
    rm /init_script.sh 
   

COPY srcs/frontend/html /var/www/html 

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 443
