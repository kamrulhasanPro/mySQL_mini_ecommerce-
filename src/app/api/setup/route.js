import { db } from "@/configs/db";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    await db.query(`
            CREATE TABLE IF NOT EXISTS products (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100),
            price DECIMAL(10, 2) NOT NULL,
            stock INT DEFAULT 0,
            created_at DATETIME DEFAULT NOW()
            )
            `);

    return NextResponse.json({ message: "Table created!" });
  } catch (err) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
