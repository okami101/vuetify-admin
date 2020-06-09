#!/bin/sh
set -e

setfacl -R -m u:www-data:rwX -m u:"$(whoami)":rwX storage
setfacl -dR -m u:www-data:rwX -m u:"$(whoami)":rwX storage

exec docker-php-entrypoint "$@"
