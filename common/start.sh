source ../settings.ini

pm2 start ./server/index.js --name common_$PORT_COMMON --watch