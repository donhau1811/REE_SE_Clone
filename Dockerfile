FROM node:14
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./package.json /usr/src/app/
RUN npm install yarn && npm i
COPY ./ /usr/src/app
RUN npm run build
ENV NODE_ENV production
ENV PORT 4000
EXPOSE 4000
CMD ["yarn","run","serve"]
