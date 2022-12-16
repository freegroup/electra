source ../settings.ini

pm2 start ./server/index.js --name designer_$PORT_DESIGNER 