# Étape 1 : Construction de l'application Angular
FROM node:14.15.0 as builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install 

COPY . .
RUN npm run build --configuration=production

# Étape 2 : Exécution de l'application Angular dans Nginx
FROM nginx:1.21-alpine

# Supprimer la configuration par défaut de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Create the "assets" directory
RUN mkdir -p /usr/share/nginx/html/assets

# Copier les fichiers de l'étape de construction de l'application Angular vers le répertoire de contenu de Nginx
COPY --from=builder /app/dist/* /usr/share/nginx/html/

# Copy the "assets" directory to /usr/share/nginx/html/assets
COPY --from=builder /app/src/assets /usr/share/nginx/html/assets

# Configuration optionnelle : si votre application Angular utilise des routes avec le mode HTML5
# décommentez les deux lignes suivantes pour gérer ces routes dans Nginx
COPY default.conf /etc/nginx/conf.d/default.conf
RUN sed -i -e 's|$document_root$fastcgi_script_name|/index.html break;|g' /etc/nginx/conf.d/default.conf

# Exposer le port 81 pour les requêtes HTTP
EXPOSE 80

# Commande de démarrage pour exécuter Nginx
CMD ["nginx", "-g", "daemon off;"]