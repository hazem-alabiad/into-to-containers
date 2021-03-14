########    build Stage     #########
FROM node:12-stretch As build
WORKDIR /build
COPY package.json package-lock.json ./
RUN npm ci
COPY . .


#########     Run Stage     #########
FROM alpine:3.10

# Using Alpine package manager install packages
RUN apk add --update nodejs-current

# Add user and user group
RUN addgroup -S node && adduser -S node -G node

USER node

RUN mkdir /home/node/code

WORKDIR /home/node/code

COPY --from=build --chown=node:node ./build . 

CMD ["node", "index.js"]