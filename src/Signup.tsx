import React, { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [emailid, setEmailid] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Updated CSS styles with the same properties as the previous component
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

  const handleInputChange = (e, setter) => setter(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, emailid, password }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage("Signup Successful!");
        setName("");
        setEmailid("");
        setPassword("");
      } else {
        setMessage(data.message || "Signup failed");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={name}
          onChange={(e) => handleInputChange(e, setName)}
          placeholder="Name"
          style={styles.input}
        />
        <input
          type="email"
          value={emailid}
          onChange={(e) => handleInputChange(e, setEmailid)}
          placeholder="Email"
          style={styles.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => handleInputChange(e, setPassword)}
          placeholder="Password"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Signup
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;
