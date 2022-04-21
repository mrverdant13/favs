const http = require('http');
const app = require('./server');

const server = http.createServer(app);
server.listen(() => {
  // eslint-disable-next-line no-console
  console.log('Server is running');
});
