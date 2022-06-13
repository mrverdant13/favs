const { favItemsPaths, favItemSchemas } = require('./fav-items/docs');
const { favsListsPaths, favsListsSchemas } = require('./favs-lists/docs');
const { userSchemas, usersPaths } = require('./users/docs');

module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Favs API',
    description: 'Favs management API',
    version: '0.0.1',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
    },
    {
      url: 'http://localhost:3000/api/v1',
    },
  ],
  tags: [
    {
      name: 'fav-items',
      description: 'Fav items API',
    },
    {
      name: 'favs-lists',
      description: 'Fav lists API',
    },
    {
      name: 'users',
      description: 'Users API',
    },
  ],
  paths: {
    ...usersPaths,
    ...favsListsPaths,
    ...favItemsPaths,
  },
  components: {
    schemas: {
      ...userSchemas,
      ...favsListsSchemas,
      ...favItemSchemas,
    },
    securitySchemes: {
      Bearer: {
        type: 'http',
        scheme: 'bearer',
        in: 'header',
        bearerFormat: 'JWT',
      },
    },
  },
};
