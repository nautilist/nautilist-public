/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');
const port = app.get('port');
// const server = app.listen(port);

const https = require('https')
const fs = require('fs')
const path = require('path')

const certOptions = {
  key: fs.readFileSync(path.resolve('config/certs/server.key')),
  cert: fs.readFileSync(path.resolve('config/certs/server.crt'))
}

// https server
const server = https.createServer(certOptions, app).listen(port);

// Call app.setup to initialize all services and SocketIO
app.setup(server);


process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Feathers application started on https://%s:%d', app.get('host'), port)
);
