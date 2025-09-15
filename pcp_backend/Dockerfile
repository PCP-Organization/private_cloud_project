FROM node:20

# Installiere nginx + openssl


# Arbeitsverzeichnis
WORKDIR /app


# Kopiere Node-Dateien
COPY package*.json ./
RUN npm install
COPY server.js .


EXPOSE 80

# Sauberes Start-Kommando
CMD ["node","server.js"]