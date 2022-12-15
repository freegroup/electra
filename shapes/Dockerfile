FROM --platform=linux/amd64 node:17-alpine

WORKDIR /app

RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont

COPY ./data ./data
COPY server ./server
COPY package.json .
COPY package-lock.json .

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN npm install

# Add user so we don't need --no-sandbox.
RUN addgroup -S beaker && adduser -S -G beaker beaker \
    && mkdir -p /home/beaker/Downloads /app \
    && chown -R beaker:beaker /home/beaker \
    && chown -R beaker:beaker /app

# Run everything after as non-privileged user.
USER beaker:beaker


ENTRYPOINT ["node", "server/index.js"]
