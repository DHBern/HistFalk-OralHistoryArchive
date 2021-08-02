FROM jekyll/jekyll:4.2.0

# Arbeitsverzeichnis erstellen und alles kopieren
RUN mkdir -p /home/jekyll/OH-Archive/
RUN chown -R jekyll:jekyll /home/jekyll/OH-Archive
WORKDIR /home/jekyll/
COPY --chown=jekyll:jekyll ./OH-Archive/ ./OH-Archive/
COPY --chown=jekyll:jekyll ./package.json ./

# Cronjob erstellen
RUN echo '0 * * * * node /home/jekyll/OH-Archive/backend/generate-md-files.js' >> /etc/crontabs/root

# Dependencies installieren
USER jekyll
RUN npm install
WORKDIR /home/jekyll/OH-Archive
USER root
RUN bundle install

# MD-Files generieren
USER jekyll
WORKDIR /home/jekyll/OH-Archive/backend
RUN node ./generate-md-files.js

# Crond und Jekyll Server mit start.sh starten
USER root
WORKDIR /home/jekyll/OH-Archive

RUN apk add --update apk-cron && rm -rf /var/cache/apk/*

COPY start.sh /
RUN chmod +x /start.sh
ENTRYPOINT ["/start.sh"]

EXPOSE 4000
EXPOSE 35729
