ssh server "rm -rf /var/www/html/js-fun/*"
yarn build
rsync -avz build/* server:/var/www/html/js-fun
ssh server "/etc/init.d/nginx restart"
