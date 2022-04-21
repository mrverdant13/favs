const http = require('http');
const app = require('./server');

const { port } = require('./server/config');

const server = http.createServer(app);
server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running');
});
