source ../settings.ini

pm2 start ./server/index.js --name permissions_$PORT_PERMISSIONS --watch