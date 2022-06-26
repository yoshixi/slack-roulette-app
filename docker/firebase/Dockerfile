FROM openjdk:slim

RUN set -ex \
  && apt-get update \
  && apt-get install -y curl \
  && curl -sL https://deb.nodesource.com/setup_14.x | bash \
  && apt-get install -y nodejs \
  && npm install -g firebase-tools

COPY firebase.json firebase.json

# https://firebase.google.com/docs/emulator-suite/install_and_configure#port_configuration
# Emulator Suite UI
EXPOSE 4000
# Auth
EXPOSE 8080
# Firestore
EXPOSE 9099

ENTRYPOINT ["firebase"]
