require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  database: {
    protocol: process.env.DB_PROTOCOL,
    url: process.env.DB_URL,
    usernane: process.env.DB_USERNANE,
    password: process.env.DB_PASSWORD,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiration: process.env.JWT_EXPIRATION,
  },
};

module.exports = config;
