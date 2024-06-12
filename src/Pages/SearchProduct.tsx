import React, { useState } from "react";
import axios from "axios";

// Define the styles object
const styles = {
  form: {
    display: "flex",
    flexDirection: "column" as const,
    width: "100%", // Make form width 100%
    maxWidth: "300px", // Max width of form
    margin: "10px auto", // Center form and add margin on top
  },
  input: {
    marginBottom: "10px",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "white", // Input background color set to white
    color: "black", // Input text color set to black
    width: "calc(100% - 16px)", // Adjust width to ensure padding doesn't extend input
    "::placeholder": {
      // Placeholder style
      color: "black", // Placeholder text color set to black
    },
  },
  button: {
    padding: "10px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "white", // Button background color set to white
    color: "black", // Button text color set to black
    cursor: "pointer",
    width: "100%", // Button takes full width of the form
  },
};

// Define the SearchProduct component
const SearchProduct = () => {
  // State for storing the product ID input by the user
  const [productId, setProductId] = useState("");
  // State for storing the fetched product data
  const [product, setProduct] = useState<{
    img: string;
    name: string;
    detail: string;
    price: number;
  } | null>(null);
  // State for storing any error messages
  const [error, setError] = useState("");

  // Function to handle the search operation
  const handleSearch = async () => {
    try {
      // Attempt to fetch product data from the API
      const response = await axios.get(
        `http://localhost:3001/api/storage/${productId}`
      );
      // If successful, update the product state with the fetched data
      setProduct(response.data);
      // Clear any previous error messages
      setError("");
    } catch (err) {
      // If an error occurs, set the error state with a message
      setError("Product not found or error fetching product.");
      // Clear the product state
      setProduct(null);
    }
  };

  // Render the component
  return (
    <div style={styles.form}>
      {/* Input field for the product ID */}
      <input
        type="text"
        placeholder="Enter Product ID or Product Name"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        style={styles.input}
      />
      {/* Button to trigger the search operation */}
      <button onClick={handleSearch} style={styles.button}>
        Search by ID
      </button>
      {/* Display error message if any */}
      {error && <div>{error}</div>}
      {/* Display product details if a product is found */}
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
