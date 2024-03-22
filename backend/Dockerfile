FROM node:20-bullseye
WORKDIR /usr/src/app
COPY . /usr/src/app
ENV NODE_ENV production
RUN npm install
EXPOSE 6205
CMD [ "npm", "start" ]