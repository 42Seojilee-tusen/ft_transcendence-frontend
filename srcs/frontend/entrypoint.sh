#!/bin/sh

if [ ! -f $SSL_KEY ]; then
	mkdir -p /etc/ssl/private /etc/ssl/certs && \
	openssl req -newkey rsa:2048 -nodes -x509 -days 365 \
	-keyout $SSL_KEY \
	-out $SSL_CRT \
	-subj "/C=KR/ST=Seoul/L=Gaepo/O=hyeognsh/CN=$DOMAIN_NAME"
fi

echo 'export const WSS_PROTOCOL = "wss://";' > /usr/share/nginx/html/js/constants/ApiConstants.js
echo 'export const HOST = window.location.hostname;' >> /usr/share/nginx/html/js/constants/ApiConstants.js
echo "export const OAUTH_URI = '$OAUTH_URI';" >> /usr/share/nginx/html/js/constants/ApiConstants.js

nginx -g "daemon off;"
