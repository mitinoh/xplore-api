nest build
#/var/lib/caddy
npm run prebuild
NODE_ENV=dev npm run build
tar -czf dist.tar.gz dist
scp dist.tar.gz root@107.174.186.223:/var/www
ssh root@107.174.186.223 /root/.nvm/versions/node/v16.13.1/lib/node_modules/pm2/bin/pm2 delete nj1
ssh root@107.174.186.223 tar -xf /var/www/dist.tar.gz -C /var/www/
ssh root@107.174.186.223 ls /var/www/
ssh root@107.174.186.223 NODE_ENV=prod /root/.nvm/versions/node/v16.13.1/lib/node_modules/pm2/bin/pm2 start /var/www/dist/src/main.js -n nj1
#ssh root@107.174.186.223 rm /var/www/dist.tar.gz
