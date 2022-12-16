source ../settings.ini

pm2 start ./server/index.js --name author_$PORT_AUTHOR --watch