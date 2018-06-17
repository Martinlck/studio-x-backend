FROM node:8-alpine

LABEL version="13" \
  description="Studio X Backend" \
  maintainers="Martin Fidel Graciano <martinfidellck@gmail.com>"


RUN apk add --update redis net-tools tmux \
  && rm -rf /var/cache/apk/*

WORKDIR /home/node
COPY . /home/node

RUN chown -R node /usr/local && chown -R node /home/node

USER node

EXPOSE 8080

RUN npm i -g pm2@2.6.0 minimatch@latest \
 && npm i

RUN npm rebuild

RUN npx actionhero generate

CMD ["pm2-docker", "start", "-i", "0", "./node_modules/.bin/actionhero"]
