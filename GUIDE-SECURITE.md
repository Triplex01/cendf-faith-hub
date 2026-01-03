# Guide de Sécurité CENDF

## Mesures de Sécurité Implémentées

### 1. En-têtes de Sécurité HTTP

Les en-têtes suivants sont configurés dans `index.html` :

```html
<meta http-equiv="X-Content-Type-Options" content="nosniff" />
<meta http-equiv="X-Frame-Options" content="SAMEORIGIN" />
<meta http-equiv="X-XSS-Protection" content="1; mode=block" />
<meta name="referrer" content="strict-origin-when-cross-origin" />
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
```

### 2. Configuration .htaccess (Apache)

Créez un fichier `.htaccess` à la racine de votre serveur :

```apache
# Activer HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# En-têtes de sécurité
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"
    
    # HSTS - Force HTTPS pendant 1 an
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
    
    # Content Security Policy
    Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; media-src 'self' https://dc1.serverse.com; connect-src 'self' https://dc1.serverse.com https://*.wordpress.com https://cendf-ci.local https://cedfci.org; frame-ancestors 'self';"
</IfModule>

# Empêcher l'accès aux fichiers sensibles
<FilesMatch "(^\.ht|\.env|\.git|\.log|\.bak|~)$">
    Order allow,deny
    Deny from all
</FilesMatch>

# Désactiver la signature du serveur
ServerSignature Off

# Empêcher le listage des répertoires
Options -Indexes

# Protection contre le clickjacking
<IfModule mod_headers.c>
    Header set X-Frame-Options "SAMEORIGIN"
</IfModule>
```

### 3. Configuration Nginx

Si vous utilisez Nginx, ajoutez ces directives :

```nginx
server {
    listen 443 ssl http2;
    server_name cedfci.org www.cedfci.org;
    
    # SSL Configuration
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers off;
    
    # Security Headers
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    
    # Content Security Policy
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; media-src 'self' https://dc1.serverse.com; connect-src 'self' https://*.serverse.com https://cedfci.org;" always;
    
    location / {
        root /var/www/cedfci.org/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    # Block access to sensitive files
    location ~ /\. {
        deny all;
    }
    
    location ~ \.(env|log|bak)$ {
        deny all;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name cedfci.org www.cedfci.org;
    return 301 https://$server_name$request_uri;
}
```

### 4. Certificat SSL

Pour obtenir un certificat SSL gratuit avec Let's Encrypt :

```bash
# Installation Certbot
sudo apt install certbot python3-certbot-nginx

# Obtenir le certificat
sudo certbot --nginx -d cedfci.org -d www.cedfci.org

# Renouvellement automatique
sudo certbot renew --dry-run
```

### 5. WordPress API Security

Le plugin `cendf-core` inclut déjà :
- Protection contre l'énumération des utilisateurs
- Limitation de débit (rate limiting)
- Gestion CORS sécurisée

### 6. Checklist de Sécurité

- [ ] Activer HTTPS sur le serveur
- [ ] Installer un certificat SSL valide
- [ ] Configurer les en-têtes de sécurité
- [ ] Mettre à jour WordPress régulièrement
- [ ] Utiliser des mots de passe forts
- [ ] Activer l'authentification à deux facteurs
- [ ] Sauvegarder régulièrement la base de données
- [ ] Surveiller les logs d'accès

### 7. Test de Sécurité

Testez votre configuration avec :
- [Security Headers](https://securityheaders.com/?q=cedfci.org)
- [SSL Labs](https://www.ssllabs.com/ssltest/analyze.html?d=cedfci.org)
- [Mozilla Observatory](https://observatory.mozilla.org/analyze/cedfci.org)
