var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'tp-nodejs'
    },
    port: 3000,
    db: 'mongodb://localhost/tp-nodejs-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'tp-nodejs'
    },
    port: 3000,
    db: 'mongodb://localhost/tp-nodejs-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'tp-nodejs'
    },
    port: 3000,
    db: 'mongodb://localhost/tp-nodejs-production'
  }
};

module.exports = config[env];
