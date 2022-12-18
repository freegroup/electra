set -x

(cd ./author && npm install) 
(cd ./author && npm run build )

(cd ./brains && npm install)
(cd ./brains && npm run build)

(cd ./circuit && npm install)
(cd ./circuit && npm run build)

(cd ./common && npm install)

(cd ./designer && npm install)
(cd ./designer && npm run build)

(cd ./home && npm install)

(cd ./ingress && npm install)

(cd ./permissions && npm install)

(cd ./shapes && npm install)
(cd ./shapes && npm run build)

(cd ./sheets && npm install)
(cd ./sheets && npm run build)

(cd ./userinfo && npm install)

