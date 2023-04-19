# build composer stuff
FROM php:8.1-cli

RUN apt-get update && apt-get install -y git zip
RUN curl -sS https://getcomposer.org/installer | php -- \
--install-dir=/usr/bin --filename=composer

COPY composer.json /var/www/html
WORKDIR /var/www/html
RUN composer install --ignore-platform-reqs

# build the final release container
FROM php:8.1-apache-bullseye
RUN a2enmod rewrite
RUN apt-get update && apt-get install -y libzip-dev zip zlib1g zlib1g-dev libpng-dev
RUN docker-php-ext-configure gd
RUN docker-php-ext-install zip
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf
WORKDIR /var/www/html
COPY src/ ./src/
COPY public/ ./public/
COPY templates/ ./templates/
COPY --from=0 /var/www/html/ ./
RUN mkdir data
RUN chown www-data:www-data -R .
