import React, { useState } from "react";
import axios from "axios";

const UserDataForm = ({ onLoginSuccess }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowError(false); // Reset error state on new submission

    const loginData = {
      emailid: userData.email,
      password: userData.password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        loginData
      );
      if (response.status === 200 && response.data.success) {
        // Invoke the callback function passed from App
        onLoginSuccess(true, response.data.name, userData.email);
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      setShowError(true);
    }
  };

  // Updated CSS styles for input and placeholder
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
    <div style={{ marginTop: "10px" }}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
      {showError && <div style={{ color: "white" }}>Error: Login failed.</div>}
    </div>
  );
};

export default UserDataForm;
