#!/bin/sh
# Inicia json-server en el fondo
json-server --watch db.json --port 3000 &
# Arranca Nginx en primer plano
nginx -g 'daemon off;'