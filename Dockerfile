FROM jekyll/jekyll:4.2.0

RUN mkdir -p /home/jekyll/OH-Archive/

RUN chown -R jekyll:jekyll /home/jekyll/OH-Archive

WORKDIR /home/jekyll/

COPY --chown=jekyll:jekyll ./OH-Archive/ ./OH-Archive/

COPY --chown=jekyll:jekyll ./package.json ./

RUN echo '0 0 * * * node /home/jekyll/OH-Archive/backend/generate-md-files.js' >> /etc/crontab

USER jekyll

RUN npm install

WORKDIR /home/jekyll/OH-Archive

USER root

RUN bundle install

USER jekyll

WORKDIR /home/jekyll/OH-Archive/backend

RUN node ./generate-md-files.js

WORKDIR /home/jekyll/OH-Archive

CMD [ "bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0"]

EXPOSE 4000
EXPOSE 35729
