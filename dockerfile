
FROM node:14.3.0

RUN mkdir /nurture
WORKDIR /nurture

RUN yarn add create-react-app
