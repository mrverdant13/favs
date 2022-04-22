const http = require('http');

const { port, database: dbConnectionData } = require('./server/config');
const logger = require('./logger');
const database = require('./database');

database.connect({ ...dbConnectionData });

const app = require('./server');

const server = http.createServer(app);
server.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});
