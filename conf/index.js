var environment = process.env.NODE_ENV || 'development';

switch (environment) {
  case 'development':
    module.exports = require('./development');
    break;
  case 'staging':
    module.exports = require('./staging');
    break;
  case 'production':
    module.exports = require('./production');
    break;
  default:
    console.error("Unrecognized NODE_ENV: " + process.env.NODE_ENV);
    process.exit(1);
}