import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    const { Name, LastName, Gmail, password, role } = await req.json()

    if (!Name || !LastName || !Gmail || !password || !role) {
      return NextResponse.json({ message: "Faltan datos" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await sql`
      INSERT INTO users(email, password, id_role, name, last_name)
      VALUES (${Gmail}, ${hashedPassword}, ${role}, ${Name}, ${LastName})
    `
    
    return NextResponse.json({ message: "Usuario creado" }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Error al crear usuario" }, { status: 500 })
  }
}
