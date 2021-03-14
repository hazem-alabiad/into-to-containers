# Pull ready-made node image from Docker hub
FROM node:12-alpine

# By default, Docker runs a container as a root user which is considered to be a security issue so, we need to run the commands as unprivileged user whenever it is possible.
# Node Image writers created a special user `node` for security purposes so, let is use it to run our commands withing our container
USER node

# Set the working directory withing the container 
WORKDIR /home/node/code

# Copy the `index.js` to the working directory using permissions flag `--chown:<user>:<group>`
COPY --chown=node:node index.js index.js

# Run the command `node` with `index.js` as a parameter which means simple `node indexjs` 
CMD [ "node", "index.js" ]
