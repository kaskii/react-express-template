# React Express boilerplate

This is a boilerplate that uses React on front-end and Node.js (Express) on back-end.

Used packages include:
- **Express** -> web application framework
- **React** -> JavaScript UI library
- **Babel** -> JavaScript compiler and configurable transpiler
- **ESLint** -> linter tool
- **Mocha** -> test framework
- **Chai** -> BDD / TDD assertion library
- **Webpack** -> module bundler
- **Sass** -> Sass parser
- **Mongoose** -> MongoDB object modeling
- **Winston** -> logger 
- **Redux** -> for managing application state
- **Redux-saga** -> An alternative side effect model for Redux apps

### Prerequisites
- MongoDB (or remove/change mongoose package if you are not planning to use MongoDB)

### Things to know
- [Presentational and container components](https://redux.js.org/basics/usage-with-react#presentational-and-container-components)
- Test files are searched with following pattern: ``/src/**/*.test.js``
- In server code, each part of route should go to own folder, for example ``app.com/api/order/1`` goes to ``/src/server/api/order/``
- In server code, generally all files needed for one route should be in the same folder. 
    - Naming for files should determine what kind of file it is
    - Examples: ``/src/server/api/order/order.route.js`` ``/src/server/api/order/order.test.js`` ``/src/server/api/order/order.model.js``
- In server code, you should avoid using console.log. Logger should be used for that
```javascript
import { Logger } from './logger';

Logger.info('Hello from logger');
Logger.warning('Toilet paper is running low');
Logger.error('Uh oh, our code just blew up!');
```

### Project structure
``/public/`` has static files to serve via Express \
``/src/`` has all the sourcecode \
``/src/client/`` React app code \
``/src/server/`` Express app code \
``/src/server/api/`` Routes here. ``index.js`` combines all root routes together. Example: ``./src/server/api/version/version.route.js``). 

## Install

First, clone the repository via git:
```bash
$ git clone git@github.com:kaskii/react-express-template.git
```
Then, install dependencies using npm.
```bash
$ cd react-express-template
$ npm install
```
## Development

Start the app:
```bash
$ npm run dev
```
This command will start both front-end as well as back-end app:
- webpack in development mode with watch switch 
- nodemon with babel-node

## Build

Build the app:
```bash
$ npm run build
```
This will build front-end as well as back-end to the dist/ folder.

### Serve built version
Run the app:
```bash
$ npm run serve
```

## Tests and Lints
You can run tests with:
```bash
$ npm test
```
This will find all test files with a pattern ``/src/**/*.test.js`` and run them.

To run the lint, simply:
```bash
$ npm run lint
```
