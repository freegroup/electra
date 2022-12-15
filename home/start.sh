source ../settings.ini

echo $PORT_HOME
PORT=$PORT_HOME pm2 start ./server/index.js --name home_$PORT_HOME --watch