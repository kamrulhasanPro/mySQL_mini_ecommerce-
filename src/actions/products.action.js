"use server";

const baseURl = "http://localhost:3000";

/** 
- Get All Products 
- products.action.js
*/
export async function getProducts() {
  try {
    const products = await fetch(`${baseURl}/api/products`);
    return products.json();
  } catch (error) {
    return {
      message: "face error",
    };
  }
}

/** 
- Get Product By Id 
- products.action.js
*/
export async function getProductById(id) {
  try {
    const product = await fetch(`${baseURl}/api/products/${id}`);
    return product.json();
  } catch (error) {
    return {
      message: "face error",
    };
  }
}
