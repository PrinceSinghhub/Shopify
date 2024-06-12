import React, { useState, useEffect } from "react";
import axios from "axios";
import { z } from "zod"; // Import Zod for validation
import LoginHomePage from "./Pages/LoginHomePage";

// Define a Zod schema for validating the login form
const loginSchema = z.object({
  email: z
    .string()
    .email()
    .regex(/@gmail\.com$/, "Email must be a Gmail address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const UserDataForm = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Store validation or login error messages
  const [userName, setUserName] = useState("");

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

    // Validate userData with Zod schema
    const validationResult = loginSchema.safeParse(userData);
    if (!validationResult.success) {
      // If validation fails, show the first error message
      setErrorMessage(validationResult.error.errors[0].message);
      setShowError(true);
      return; // Stop the form submission
    }

    // Prepare data for the login API
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
        setUserName(response.data.name); // Store the user's name upon successful login
        setIsLoggedIn(true);
      } else {
        // Handle unsuccessful login attempts
        setIsLoggedIn(false);
        setShowError(true);
        setErrorMessage(
          "Error: Login ID does not exist or incorrect password."
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      setShowError(true);
      setErrorMessage("Login error: " + error.message);
    }
  };

  useEffect(() => {
    if (userName) {
      console.log(userName); // Log the userName when it changes
    }
  }, [userName]);

  // Inline CSS styles
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      width: "300px",
    },
    input: {
      marginBottom: "10px",
      padding: "8px",
      borderRadius: "4px",
      border: "1px solid #ccc",
    },
    button: {
      padding: "10px",
      borderRadius: "4px",
      border: "none",
      backgroundColor: "#007bff",
      color: "white",
      cursor: "pointer",
    },
  };

  return (
    <>
      {!isLoggedIn ? (
        <div style={styles.container}>
          <form style={styles.form} onSubmit={handleSubmit}>
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
          {showError && (
            <div style={{ color: "red", marginTop: "10px" }}>
              {errorMessage}
            </div>
          )}
        </div>
      ) : (
        <LoginHomePage Name={userName} Email={userData.email} />
      )}
    </>
  );
};

export default UserDataForm;
