source ../settings.ini

pm2 start ./server/index.js --name userinfo_$PORT_USERINFO --watch