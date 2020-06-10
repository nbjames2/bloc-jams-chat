FROM node:10.20.1-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install -g serve --silent
RUN npm install --production --silent
COPY . .

CMD serve -s build