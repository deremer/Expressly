# Expressly
### A blueprint for an Express-based Node.js web app.

----

## Twitter Bootstrap
This version is setup to launch an Express project using Twitter Bootstrap 2.
(http://twitter.github.com/bootstrap/)

You can load the Bootstrap documentation homepage at localhost:3000/bootstrap, but links are not functional.


## Why
Setting up a new Express app each time is tedious. It's imperative to have a good flexible structure that you understand very well. But setting it up each time is a hassle. Cloning this repo is a shortcut.

## What
This is my system. This is how I organize Express apps. It allows for centralized "config" as well as dynamic addition of route/controller/model files. Following this formulat gets me up and running quickly.

## Requirements
This uses Express, Mongoose as the manipulator of MongoDB, and Redis as a session store. It's built to run on Heroku (which is currently on node 4.7)

* Express	(http://expressjs.com/)
* Mongoose (http://mongoosejs.com/)
* Forever (https://github.com/nodejitsu/forever)
* Async (https://github.com/caolan/async)
* Connect-Redis (https://github.com/visionmedia/connect-redis)

## Architecture

The file structure looks like this:

**app** - The primary folder for the logic of the app.

> * **app.js** - Creates the express app, executes the config functions, and mounts the models and routes
> * **cluster.js** - Launches app.js as a cluster
> * **start.js** - **Starts the app** by setting cluster.js to run forever

> **controllers** - Files that control what the app should do with a web request

>> * **c_xxxx.js** - Create controller files of the included template with "c_" at the beginning of the file name. Controllers are dynamically loaded by the routes.

> **models** - Mongoose model definitions that set the data schema and control how data is manipulated

>> * **m_xxxx.js** - Create model files of the included template with "m_" at the beginning of the file name. Models are bound to the app when initialized and passed to routes and controllers for access.
>> * **models.js** - Loads all model files in the 'models' directory. All models become accessible as m.UPPERCASED_MODELNAME in routes and controllers.

> **routes** - Define the HTTP entry to the controllers

>> * **r_xxxx.js** - Create route files of the included template with "r_" at the beginning of the file name. Routes are bound to the app when initialized.
>> * **routes.js** - Loads all route files in the 'models' directory and mounts the controller with the corresponding name.

> **view** - Views that render the data (I prefer ejs)

**config** - The primary folder for the logic of the app.  

> **environments** - This is where environment specific parameters are set

>> * **all.js** - Config settings that app to every environment
>> * **development.js/testing.js/production.js** - Config settings that apply to environment the app is being run in

> **params** - Contains app-level params

>> * **errors.js** - Define errors here to allow for convenient and centralized error messages in the app
>> * **params.js** - Central place to maintain global params as well as params for each environment

**lib** - A container for other modules

**public** - A container for public files (e.g., favicon, images, css, html, etc)

## Getting Started

#### Set config files

* In params.js, define the parameters that your app needs
* Most importantly set your mongo (mongoStore) and redis URIs (redisSession)
* For mongo, I find www.mongolab.com to be amazing
* For redis, I use www.redistogo.com

#### Update environment settings

* You may not need to do anything if you don't have other requirements for Express, but update each environment's settings if needed

#### Create Models, Routes, Controllers

* Define new Mongoose models using the format of the sample found in the "models" folder. Each file must have a name like "m_modelname.js" where it begins with "m_". The models will be automatically mounted to the app when it launches. Models can be accessed in the routes and controllers as m.MODELNAME
* Define new routes using the format provided. Each file must have a name like "r_routename.js" where it begins with "r_". The routes will be automatically mounted to the app when it launches. Route names and controller names must be the same after the leading "_r" and "_c". Each route should have a unique controller function that it calls. I like to make the name the camelcased path of the endpoint. For example, GET /user/:id would be getUserId()
* Define controllers using the format provided. Each file must have a name like "c_controllername.js" where it beings with "c_" and "controllername" must match the name of the associated route.

#### That's it! Now go to the console and say "node ./app/start.js"
