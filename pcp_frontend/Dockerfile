FROM node:20

# Installiere nginx + openssl
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Arbeitsverzeichnis
WORKDIR /app



# Kopiere Node-Dateien
COPY package*.json ./
RUN npm install
COPY app.js .
COPY views ./views



# Starte Script kopieren


# Port freigeben
EXPOSE 443

# Sauberes Start-Kommando
CMD ["node","app.js"]

