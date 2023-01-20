FROM node:18

WORKDIR /usr/src/bot

COPY package*.json ./
RUN npm install
RUN npm install -g pm2
RUN npm ci --only=production

COPY . .

EXPOSE 8080
CMD [ "pm2-runtime", "server.js" ]
