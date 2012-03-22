# Expressly
### A blueprint for an Express-based Node.js web app.

----

## Why
Setting up a new Express app each time is tedious. It's imperative to have a good flexible structure that you understand very well. But setting it up each time is a hassle. Cloning this repo is a shortcut.

## What
This is my system. This is how I organize Express apps. It allows for centralized "config" as well as dynamic addition of route/controller/model files. Following this formulat gets me up and running quickly.

## Requirements
This uses Express, Mongoose as the manipulator of MongoDB, and Redis as a session store. It's built to run on Heroku (which is currently on node 4.7)

* Express	(http://expressjs.com/)
* Mongoose (http://mongoosejs.com/)
* Cluster (https://github.com/LearnBoost/cluster)
* Forever (https://github.com/nodejitsu/forever)
* Async (https://github.com/caolan/async)
* Connect-Redis (https://github.com/visionmedia/connect-redis)

## How

### Architecture

The file structure looks like this:

--app
----controllers
----models
----routes
----views
--config
----environments
----params
--lib
--public


**app** - The primary folder for the logic of the app.

*app.js* - Creates the express app, executes the config functions, and binds the models and routes
*cluster.js* - Launches app.js as a cluster
*start.js* - **Starts the app** by setting cluster.js to run forever

* *controllers* - Files that control what the app should do with a web request

** *c_xxxx.js* - Create controller files of the included template with "c_" at the beginning of the file name. Controllers are dynamically loaded by the routes.
* *models* - Mongoose model definitions that set the data schema and control how data is manipulated
** *m_xxxx.js* - Create model files of the included template with "m_" at the beginning of the file name. Models are bound to the app when initialized and passed to routes and controllers for access.
** *models.js* - Loads all model files in the 'models' directory. All models become accessible as m.UPPERCASED_MODELNAME in routes and controllers.
* *routes* - Define the HTTP entry to the controllers
** *r_xxxx.js* - Create route files of the included template with "r_" at the beginning of the file name. Routes are bound to the app when initialized.
** *routes.js* - Loads all route files in the 'models' directory and binds the controller with the corresponding name.
* *view* - Views that render the data (I prefer ejs)

**config** - The primary folder for the logic of the app.  
* *environments* - This is where environment specific parameters are set
** *all.js* - Config settings that app to every environment
** *development.js/testing.js/production.js* - Config settings that apply to environment the app is being run in
* *params* - Contains app-level params
** *errors.js* - Define errors here to allow for convenient and centralized error messages in the app
** *params.js* - Central place to maintain global params as well as params for each environment

**lib** - A container for other modules

**public** - A container for public files (e.g., favicon, images, css, html, etc)