set -x

(cd ./author && rm -rf ./node-modules )  
(cd ./author && npm install )  
(cd ./author && npm run build )

(cd ./brains && rm -rf ./node-modules )  
(cd ./brains && npm install )

(cd ./circuit && rm -rf node-modules )  
(cd ./circuit && npm install )
(cd ./circuit && npm run build)

(cd ./common && rm -rf node-modules )  
(cd ./common && npm install )

(cd ./designer && rm -rf node-modules )  
(cd ./designer && npm install )
(cd ./designer && npm run build)

(cd ./home && rm -rf node-modules )  
(cd ./home && npm install )
(cd ./home && npm run build)

(cd ./ingress && rm -rf node-modules )  
(cd ./ingress && npm install )

(cd ./permissions && rm -rf node-modules )  
(cd ./permissions && npm install )

(cd ./shapes && rm -rf node-modules )  
(cd ./shapes && npm install )

(cd ./sheets && rm -rf node-modules )  
(cd ./sheets && npm install )

(cd ./userinfo && rm -rf node-modules )  
(cd ./userinfo && npm install )

