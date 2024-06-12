import React, { useState } from "react";

const AddProductForm = ({ onAdd }) => {
  const [product, setProduct] = useState({
    id: "", // Initialize id as an empty string to allow user input
    name: "",
    detail: "",
    price: "",
    img: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === "price" ? parseFloat(value) || "" : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(product); // Call onAdd with the product, including the manually entered id
    setProduct({ id: "", name: "", detail: "", price: "", img: "" }); // Reset form after submission
  };

  // Updated CSS styles with the same properties as the previous components
  const styles = {
    form: {
      display: "flex",
      flexDirection: "column",
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

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="number"
        name="id"
        value={product.id}
        onChange={handleChange}
        placeholder="ID"
        required
        style={styles.input}
      />
      <input
        type="text"
        name="name"
        value={product.name}
        onChange={handleChange}
        placeholder="Name"
        required
        style={styles.input}
      />
      <input
        type="text"
        name="detail"
        value={product.detail}
        onChange={handleChange}
        placeholder="Detail"
        required
        style={styles.input}
      />
      <input
        type="number"
        name="price"
        value={product.price.toString()}
        onChange={handleChange}
        placeholder="Price"
        required
        style={styles.input}
      />
      <input
        type="text"
        name="img"
        value={product.img}
        onChange={handleChange}
        placeholder="Image URL"
        required
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Add Product
      </button>
    </form>
  );
};

export default AddProductForm;
