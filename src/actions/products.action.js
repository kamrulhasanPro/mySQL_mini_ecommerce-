"use server";

const baseURl = "http://localhost:3000";

/** 
- Get All Products 
- products.action.js
*/
export async function getProducts() {
  try {
    const res = await fetch(`${baseURl}/api/products`);

    const products = await res.json();

    if (!res.ok) throw new Error(products.error || "Something went wrong");
    return products;
  } catch (err) {
    return {
      error: err.message,
    };
  }
}

/** 
- Get Product By Id 
- products.action.js
*/
export async function getProductById(id) {
  try {
    const res = await fetch(`${baseURl}/api/products/${id}`);

    const product = await res.json();

    if (!res.ok) throw new Error(product.error || "Something went wrong");

    return product;
  } catch (err) {
    return {
      error: err.message,
    };
  }
}

/** 
- Add Product 
- products.action.js
*/
export async function postProduct(product) {
  try {
    const res = await fetch(`${baseURl}/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Something went wrong");
    return data;
  } catch (err) {
    return { error: err.message };
  }
}

/** 
- Update Product 
- products.action.js
*/
export async function updateProduct(product, id) {
  try {
    const res = await fetch(`${baseURl}/api/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Something went wrong");
    return data;
  } catch (err) {
    return { error: err.message };
  }
}

/** 
- Delete Product By Id 
- products.action.js
*/
export async function deleteProductById(id) {
  console.log(id);
  try {
    const res = await fetch(`${baseURl}/api/products/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      return { success: true };
    }
    return { success: false };
  } catch (err) {
    return {
      error: err.message,
    };
  }
}
