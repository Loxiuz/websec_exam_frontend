FROM nginx:trixie-perl
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/ /usr/share/nginx/html/
COPY ssl/ /etc/nginx/ssl/
COPY mime.types /etc/nginx/mime.types


