import { useState } from "react";
import axios from "axios";

const styles = {
  form: {
    display: "flex",
    flexDirection: "column" as const,
    width: "100%",
    maxWidth: "300px",
    margin: "10px auto",
  },
  input: {
    marginBottom: "10px",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "white",
    color: "black",
    width: "calc(100% - 16px)",
    "::placeholder": {
      color: "black",
    },
  },
  button: {
    padding: "10px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "white",
    color: "black",
    cursor: "pointer",
    width: "100%",
  },
};

const SearchProduct = () => {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState<{
    img: string;
    name: string;
    detail: string;
    price: number;
  } | null>(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/storage/${productId}`
      );
      setProduct(response.data);
      setError("");
    } catch (err) {
      setError("Product not found or error fetching product.");
      setProduct(null);
    }
  };

  return (
    <div style={styles.form}>
      <input
        type="text"
        placeholder="Enter Product ID or Product Name"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleSearch} style={styles.button}>
        Search by ID
      </button>
      {error && <div>{error}</div>}
      {product && (
        <div
          className="product-card"
          style={{
            width: "300px",
            height: "300px",
            margin: "10px",
            position: "relative",
            borderRadius: "10%",
            overflow: "hidden",
          }}
        >
          <img
            src={product.img}
            alt={product.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "0",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              width: "100%",
              padding: "10px",
              textAlign: "center",
            }}
          >
            <h4>
              ID: {product.name} - {product.name}
            </h4>
            <p>{product.detail}</p>
            <p>Price: ${product.price}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchProduct;
