FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

# Création du groupe et de l'utilisateur "nodejs"
RUN groupadd -g 1001 nodejs && \
    useradd -u 1001 -g nodejs -m nodejs && \
    chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 8080

CMD ["npm", "start"]

