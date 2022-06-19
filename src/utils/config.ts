const ENV = process.env.NODE_ENV;
const PORT = process.env.MODE == 'edge' ? 8081 : process.env.PORT || 8601;

const IP_ADDRESS_ENGINE = process.env.IP_ADDRESS_ENGINE;

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE =
  process.env.NODE_ENV === 'test' ? process.env.DB_DATABASE_TEST : process.env.DB_DATABASE;

export const config = {
  ENV,
  PORT,
  IP_ADDRESS_ENGINE,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
};
