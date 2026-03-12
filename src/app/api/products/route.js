import { db } from "@/configs/db";
import { NextResponse, NextRequest } from "next/server";

/**
 - Get All Products
*/
export async function GET() {
  try {
    const [products] = await db.query(`
        SELECT * FROM products
        `);
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 - Post A Product
*/
export async function POST(req) {
  const sql = `
        INSERT INTO products(name, price, stock) VALUES(?, ?, ?)
        `;

  try {
    // data find
    const { name, price, stock } = await req.json();

    // insert data
    const [result] = await db.query(sql, [name, price, stock]);

    // response
    return NextResponse.json({
      message: "Product created!",
      id: result.insertId,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
