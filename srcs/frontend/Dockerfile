FROM nginx:stable

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY ./entrypoint.sh /home/entrypoint.sh

RUN chmod +x /home/entrypoint.sh

EXPOSE 443 80

ENTRYPOINT ["/home/entrypoint.sh"]
