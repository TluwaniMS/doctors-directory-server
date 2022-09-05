FROM node:12-alpine
RUN apk add --no-cache python2 g++ make
WORKDIR /doctors-directory-server
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .
CMD ["node", "server.js"]
EXPOSE 3000