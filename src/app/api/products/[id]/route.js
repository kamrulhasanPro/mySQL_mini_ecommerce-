import { db } from "@/configs/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const sql = `SELECT * FROM products
        WHERE id = ?`;

    const [result] = await db.query(sql, id);

    if (result.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }


    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
