import React, { useEffect, useState } from "react";

// Define the interface for product data
interface Product {
  id: number;
  name: string;
  detail: string;
  price: number;
  img: string;
}

const AllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Function to fetch products from the API
  const fetchProducts = () => {
    fetch("http://localhost:3001/api/storage")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  };

  // Fetch products from the API when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []); // Empty dependency array means this effect runs once on mount

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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
