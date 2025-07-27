// app/api/roles/route.ts
import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false },
});

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM roles");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error al obtener roles:", error);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
