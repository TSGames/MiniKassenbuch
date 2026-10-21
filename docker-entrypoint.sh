#!/bin/sh
set -e

# Log the PHP version the container runs with, then hand over to the main command
echo "MiniKassenbuch starting with PHP $(php -r 'echo PHP_VERSION;')"

exec "$@"
