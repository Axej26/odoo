// lib/db.ts
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }, // Neon requiere SSL
});

export default pool;
