# build composer dependencies
FROM php:8.4-cli-bookworm as composer-builder

RUN apt-get update && apt-get install -y git zip
RUN curl -sS https://getcomposer.org/installer | php -- \
--install-dir=/usr/bin --filename=composer

COPY composer.json /var/www/html
WORKDIR /var/www/html
RUN composer install --ignore-platform-reqs

# build angular frontend
FROM node:20-alpine as frontend-builder

WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build

# build the final release container
FROM php:8.4-apache-bookworm

RUN a2enmod rewrite
RUN apt-get update && apt-get install -y libzip-dev zip zlib1g zlib1g-dev libpng-dev
RUN docker-php-ext-configure gd
RUN docker-php-ext-install zip
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

WORKDIR /var/www/html

# Copy PHP backend code
COPY src/ ./src/
COPY templates/ ./templates/
COPY public/index.php ./public/
COPY public/.htaccess ./public/
COPY public/logo.png ./public/

# Copy composer dependencies
COPY --from=composer-builder /var/www/html/vendor ./vendor

# Copy built Angular frontend
COPY --from=frontend-builder /app/dist/mini-kassenbuch/* ./public/

# Create data directory and set permissions
RUN mkdir -p data && chown www-data:www-data -R .
