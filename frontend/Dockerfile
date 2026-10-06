FROM node:26.10-alpine3.23

RUN apk upgrade --no-cache

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]