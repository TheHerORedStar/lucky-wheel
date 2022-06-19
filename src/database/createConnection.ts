import { createConnection, Connection } from 'typeorm';

const createDatabaseConnection = (): Promise<Connection> => createConnection();

export default createDatabaseConnection;
