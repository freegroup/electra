source ../settings.ini

pm2 start ./server/index.js --name ingress_$PORT_INGRESS --watch