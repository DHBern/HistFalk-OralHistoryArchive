FROM jekyll/jekyll:4.2.0 as frontend

RUN mkdir /home/jekyll/OH-Archive/ && chown -R jekyll:jekyll /home/jekyll/OH-Archive

WORKDIR /home/jekyll

COPY --chown=jekyll:jekyll ./OH-Archive/* ./OH-Archive/

RUN ls -al

RUN chmod -R 666 ./OH-Archive

USER jekyll

CMD [ "bundle", "exec", "jekyll", "serve"]

FROM node:14-alpine as production

WORKDIR /home/jekyll

COPY --chown=node:node ./package.json ./

USER node

RUN npm install

RUN echo '0 0 * * * node /home/jekyll/OH-Archive/backend/generate-md-files.js' >> /etc/crontab

RUN node ./OH-Archive/backend/generate-md-files.js




