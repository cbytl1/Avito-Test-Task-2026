FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV port=8000
EXPOSE 8000
CMD ["npm", "start"]