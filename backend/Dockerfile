FROM node:20-bullseye

RUN apt-get update && apt-get install -y \
    python3-pip
RUN pip3 install --no-cache-dir RateMyProfessorAPI

WORKDIR /usr/src/app
COPY . /usr/src/app
ENV NODE_ENV production
RUN npm install
EXPOSE 6205
CMD [ "npm", "start" ]