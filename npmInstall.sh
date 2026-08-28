set -x

(cd ./frontend/author && rm -rf ./node_modules )
(cd ./frontend/author && npm install )
(cd ./frontend/author && npm run build )


(cd ./backend/brains && rm -rf ./node_modules )
(cd ./backend/brains && npm install )

(cd ./frontend/simulator && rm -rf node_modules )
(cd ./frontend/simulator && npm install )
(cd ./frontend/simulator && npm run build)

(cd ./frontend/common && rm -rf node_modules )
(cd ./frontend/common && npm install )

(cd ./frontend/designer && rm -rf node_modules )
(cd ./frontend/designer && npm install )
(cd ./frontend/designer && npm run build)


(cd ./frontend/home && rm -rf node_modules )
(cd ./frontend/home && npm install )
(cd ./frontend/home && npm run build)

(cd ./ingress && rm -rf node_modules )
(cd ./ingress && npm install )

(cd ./backend/shapes && rm -rf node_modules )
(cd ./backend/shapes && npm install )

(cd ./backend/sheets && rm -rf node_modules )
(cd ./backend/sheets && npm install )

(cd ./backend/userinfo && rm -rf node_modules )
(cd ./backend/userinfo && npm install )
