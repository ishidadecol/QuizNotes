import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url : process.env.DB_URL,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/.js'],
  synchronize: false,
});

