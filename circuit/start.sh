source ../settings.ini

pm2 start ./server/index.js --name circuit_$PORT_CIRCUIT --watch