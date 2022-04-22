const http = require('http');

const app = require('./server');
const logger = require('./logger');
const { port } = require('./server/config');

const server = http.createServer(app);
server.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});
