/* eslint-disable no-console */
require('dotenv').config();
const logger = require('./logger');
const app = require('./app');
const port = app.get('port');
let server;

if(app.get('host') == 'localhost'){
  console.log('dev mode')
  const https = require('https')
  const fs = require('fs')
  const path = require('path')
  
  const certOptions = {
    key: fs.readFileSync(path.resolve('config/certs/server.key')),
    cert: fs.readFileSync(path.resolve('config/certs/server.crt'))
  }
  
  // https server
  server = https.createServer(certOptions, app).listen(port);
  
  // Call app.setup to initialize all services and SocketIO
  app.setup(server);  
} else{
  console.log('production mode for heroku since https is supported by default')
  server = app.listen(port);
}




process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Feathers application started on https://%s:%d', app.get('host'), port)
);
