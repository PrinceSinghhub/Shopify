import React, { useState } from "react";

// interface Product {
//   id: string;
//   name: string;
//   detail: string;
//   price: string; // Keeping price as string to match the initial state and input handling
//   img: string;
// }

// In AddProductFormProps, change the type of onAdd to accept ProductType instead of Product
interface ProductType {
  id: string;
  name: string;
  detail?: string; // Optional to align with Product interface having 'detail' instead of 'description'
  price: number; // This should be number to match ProductType in handleAddProduct
  img: string;
}

interface AddProductFormProps {
  onAdd: (product: ProductType) => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onAdd }) => {
  // Ensure the rest of AddProductForm uses ProductType for consistency
  const [product, setProduct] = useState<ProductType>({
    id: "",
    name: "",
    detail: "", // Use 'detail' to match ProductType
    price: 0, // Initialize as 0, handle as number
    img: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === "price" ? Number(value) || 0 : value, // Convert price to number, default to 0 if conversion fails
    }));
  };

  // Inside AddProductForm component
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const productData: ProductType = {
      ...product,
      price: Number(product.price), // Convert price to number
    };
    onAdd(productData);
  };

  const styles = {
    form: {
      display: "flex",
      flexDirection: "column" as const, // Use 'as const' to assert specific string literal types
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

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text" // Changed to text to handle the string type of ID
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
        type="text" // Changed to text to correctly handle the string type of price
        name="price"
        value={product.price}
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
