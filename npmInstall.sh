set -x

(cd ./author && npm install --force )  
(cd ./author && npm run build )

(cd ./brains && npm install --force )

(cd ./circuit && npm install --force )
(cd ./circuit && npm run build)

(cd ./common && npm install --force )

(cd ./designer && npm install --force )
(cd ./designer && npm run build)

(cd ./home && npm install --force )
(cd ./home && npm run build)

(cd ./ingress && npm install --force )

(cd ./permissions && npm install --force )

(cd ./shapes && npm install --force )

(cd ./sheets && npm install --force )

(cd ./userinfo && npm install --force )

