import React, { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  detail: string;
  price: number;
  img: string;
}

const DeleteProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/storage");
      const data: Product[] = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/api/storage/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Fetch the updated list of products after deletion
        fetchProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <h3>All Products</h3>
      <div
        className="products"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {products.map((product) => (
          <div
            className="product"
            key={product.id}
            style={{
              width: "300px",
              height: "300px",
              margin: "10px",
              position: "relative",
              borderRadius: "10%",
            }}
          >
            <img
              src={product.img}
              alt={product.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "10%",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "0",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                width: "93%",
                padding: "10px",
                textAlign: "center",
                borderRadius: "10%",
              }}
            >
              <h4>
                ID: {product.id} - {product.name}
              </h4>
              <p>{product.detail}</p>
              <p>Price: ${product.price}</p>
              <button
                onClick={() => deleteProduct(product.id)}
                style={{ marginTop: "10px" }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeleteProduct;
