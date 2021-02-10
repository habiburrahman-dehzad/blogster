# Blogster

![Build Status](https://travis-ci.com/habiburrahman-dehzad/blogster.svg?branch=main)

This is a Node + React + Jest project template. It provides basic setup and functionality for a new project. It implements Node + Express + Mongo DB + Redis caching on server side, and React + Redux for the front end or client side. The Passport.js library is used for authentication and google OAuth 2.0 is already setup and ready to be used.

You can remove the Routes from the Node and some Mongo DB models that you don't need and use the project as a starting point to speed up the development.

This application is built using:

1. Node.js
1. Express
1. Mongo DB
1. Redis for caching
1. Passport.js for authentication
1. React
1. Redux
1. Materialize CSS

The client side application is built using [Create React App](https://github.com/facebook/create-react-app).

## Running the application

You can run the application by running the command:

`yarn dev`

This will run both server and client together.

Please check the package.json at the root level of the project to see avaiable commands.

## CI with Travis CI

The project contains .travis.yaml file for CI configuration for [Travis CI](https://travis-ci.com).
You can create an account there and anytime you push changes to the repo a build will be triggered.
