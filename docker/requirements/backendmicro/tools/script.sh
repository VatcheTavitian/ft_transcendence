#!/bin/sh


openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/ssl/private/nginx-selfsigned.key \
    -out /etc/ssl/certs/nginx-selfsigned.crt \
    -subj "$VALUE"


if [ -f /etc/ssl/certs/nginx-selfsigned.crt ]; then
    echo "SSL certificate generated successfully at /etc/ssl/certs/nginx-selfsigned.crt"
else
    echo "Failed to generate SSL certificate"
    exit 1  
fi

echo "Launching NGINX"
