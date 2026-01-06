import { DataSource } from 'typeorm';
import { UserEntity } from './entities/UserEntity';

export const AppPostgreSQLDataSource = new DataSource({
  type: 'postgres' as const,
  host: process.env.DB_HOST_SUPABASE,
  port: parseInt(process.env.DB_PORT_SUPABASE || '5432'),
  username: process.env.DB_USER_SUPABASE,
  password: process.env.DB_PASS_SUPABASE,
  database: process.env.DB_NAME_SUPABASE,
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: false,
  logging: false,
  entities: [UserEntity],
  subscribers: [],
  migrations: [],
});
