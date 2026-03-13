import { db } from "@/configs/db";
import { NextResponse } from "next/server";

/**
 - Get product by id
 - api/products/[id]/route.js
*/
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

/**
 - delete product by id
 - api/products/[id]/route.js
*/
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const sql = `DELETE FROM products
        WHERE id = ?`;

    const [result] = await db.query(sql, id);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 - update product by id
 - api/products/[id]/route.js
*/
export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    // main update product object
    const body = await req.json();

    // get objects all keys
    const fields = Object.keys(body);
    if (fields.length === 0)
      return NextResponse.json({ error: "No data" }, { status: 400 });

    // then make sql keys structure
    const setClause = fields.map((field) => `${field} = ?`).join(", ");

    // all sql values with id
    const values = [...Object.values(body), id];

    console.log(setClause);

    const sql = `UPDATE products
      SET ${setClause}
      WHERE id = ?`;

    // main query
    const [result] = await db.query(sql, values);
    console.log(result);

    // check update
    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // return main data
    return NextResponse.json({ message: "Updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
