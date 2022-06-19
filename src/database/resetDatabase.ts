import { getConnection } from 'typeorm';

export const resetDatabase = async (): Promise<void> => {
  const connection = getConnection();
  await connection.dropDatabase();
  await connection.synchronize();
};

// export default resetDatabase;
