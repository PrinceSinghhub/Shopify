import React, { useState } from "react";
import AddProductForm from "./AddProductForm";
import AllProducts from "./AllProducts";
import UpdateProduct from "./UpdateProduct";
import DeleteProduct from "./DeleteProduct";
import SearchProduct from "./SearchProduct";

interface LoginHomePageProps {
  Name: string;
  Email: string;
}

const LoginHomePage: React.FC<LoginHomePageProps> = ({ Name, Email }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showUpdateProduct, setShowUpdateProduct] = useState(false);
  const [showDeleteProduct, setShowDeleteProduct] = useState(false);
  const [showSearchProduct, setShowSearchProduct] = useState(false); // State for SearchProduct visibility

  interface ProductType {
    id: string; // Adjusted to match the expected type of 'Product'
    name: string;
    price: number;
    description?: string;
  }

  const handleAddProduct = async (product: ProductType) => {
    try {
      const response = await fetch("http://localhost:3001/api/storage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      console.log("Product added:", data);
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <>
      <div className="loginData">
        <div
          className="text-center text-section-dark-text pt-8 pb-6"
          data-mode="dark"
          data-component-name="heading-group"
          style={
            {
              justifyContent: "center",
              justifyItems: "center",
              textAlign: "center",
              color: "rgba(255, 255, 255, 1)",
              paddingTop: "2rem",
              paddingBottom: "1.5rem",
            } as React.CSSProperties
          }
        >
          <h1
            className="richtext text-t1"
            style={{
              color: "rgba(255, 255, 255, 1)",
            }}
          >
            Build your own Ecommerce <br />
            Welcome! {Name}
          </h1>

          <div>
            <p>User ID: {Email}</p>
            <p
              className="richtext text-body-lg pt-md"
              style={
                {
                  "--tw-text-opacity": "1",
                  color: "rgba(255, 255, 255, var(--tw-text-opacity))",
                } as React.CSSProperties
              }
            >
              Shopify is trusted by millions of businesses worldwide
            </p>
          </div>
        </div>
      </div>

      <div
        className="product-actions"
        style={{ textAlign: "center", margin: "20px 0" }}
      >
        <button
          onClick={() => {
            setShowAllProducts(true);
            setShowAddForm(false);
            setShowUpdateProduct(false);
            setShowDeleteProduct(false);
            setShowSearchProduct(false); // Hide SearchProduct when showing AllProducts
          }}
          style={{ margin: "0 10px" }}
        >
          All Products
        </button>
        <button
          onClick={() => {
            setShowAddForm(!showAddForm);
            setShowAllProducts(false);
            setShowUpdateProduct(false);
            setShowDeleteProduct(false);
            setShowSearchProduct(false); // Hide SearchProduct when toggling AddProductForm
          }}
          style={{ margin: "0 10px" }}
        >
          {showAddForm ? "Cancel Product" : "Add Product"}
        </button>
        <button
          onClick={() => {
            setShowUpdateProduct(!showUpdateProduct);
            setShowAllProducts(false);
            setShowAddForm(false);
            setShowDeleteProduct(false);
            setShowSearchProduct(false); // Hide SearchProduct when toggling UpdateProduct
          }}
          style={{ margin: "0 10px" }}
        >
          {showUpdateProduct ? "Cancel Update" : "Update Product"}
        </button>
        <button
          onClick={() => {
            setShowDeleteProduct(!showDeleteProduct);
            setShowAllProducts(false);
            setShowAddForm(false);
            setShowUpdateProduct(false);
            setShowSearchProduct(false); // Hide SearchProduct when toggling DeleteProduct
          }}
          style={{ margin: "0 10px" }}
        >
          {showDeleteProduct ? "Cancel Delete" : "Delete Product"}
        </button>
        <button
          onClick={() => {
            setShowSearchProduct(!showSearchProduct);
            setShowAllProducts(false);
            setShowAddForm(false);
            setShowUpdateProduct(false);
            setShowDeleteProduct(false); // Hide other components when toggling SearchProduct
          }}
          style={{ margin: "0 10px" }}
        >
          {showSearchProduct ? "Cancel Search" : "Search Product"}
        </button>
      </div>
      {showAddForm && <AddProductForm onAdd={handleAddProduct} />}
      {showAllProducts && <AllProducts />}
      {showUpdateProduct && <UpdateProduct />}
      {showDeleteProduct && <DeleteProduct />}
      {showSearchProduct && <SearchProduct />}
    </>
  );
};

export default LoginHomePage;
