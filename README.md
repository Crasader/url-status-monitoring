-install composer on your machine then run the following commands to install dependencies:

	composer install

	composer require laravel/passport


-create an empty database and edit .env file to update database info. in it (db name,db usename and password).

-run the following command to fill and populate database:

	php artisan migrate

-run the following command to create a client for passport (OAuth2 laravel lib):

	php artisan passport:client --personal


-run the following command to setup react scaffolding:

	php artisan preset react

-run the following commands to install npm and needed react imports:

	npm install

	npm install react-router-dom --save

	npm install axios
	
    
   
-change api end point in the constants file in resources/js/constants.js

-run development environment through the following command:

    npm run dev

-make sure you have php curl package installed

project is ready to be browsed from its root point
