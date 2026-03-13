import { GetOrdersResponse, GetProductsResponse, Product } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

// bütün siparişleri getir
const getOrders = async (): GetOrdersResponse => {
  try {
    const response = await fetch(`${API_URL}/orders`);

    if (!response.ok) return [];

    const data = await response.json();

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Orders fetch failed:", error);
    return [];
  }
};

const getProducts = async (): GetProductsResponse => {
  try {
    const response = await fetch(`${API_URL}/products`);

    if (!response.ok) return [];

    const data = await response.json();

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Products fetch failed:", error);
    return [];
  }
};

const getProduct = async (productId: string): Promise<Product> => {
  const response = await fetch(`${API_URL}/products/${productId}`);

  return response.json();
};

const deleteProduct = async (productId: string) => {
  const response = await fetch(`${API_URL}/products/${productId}`, {
    method: "DELETE",
  });

  return response.json();
};

const createProduct = async (
  product: Omit<Product, "id">,
): Promise<Product> => {
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};

const updateProduct = async (
  productId: string,
  product: Partial<Product>,
): Promise<Product> => {
  const response = await fetch(`${API_URL}/products/${productId}`, {
    method: "PATCH",
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};

export {
  getOrders,
  getProducts,
  deleteProduct,
  getProduct,
  createProduct,
  updateProduct,
};
