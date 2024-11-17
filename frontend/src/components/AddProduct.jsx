import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/AddProduct.css';

const AddProduct = () => {
  const navigate = useNavigate();
  
  // States to hold form data
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(""); // State to hold image in base64 format
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // Set the image as base64 string
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setSuccessMessage(""); // Clear previous success message

    // Validate the form inputs
    if (!name || !price || !category || !image) {
      setError("Please fill all fields.");
      return;
    }

    // Prepare data to send to the backend
    const productData = { name, price, category, image };

    try {
      const response = await fetch("http://localhost:5001/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`, // Pass JWT token for authentication
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Product added successfully!");
        // Redirect to the products page or admin dashboard after successful addition
        setTimeout(() => {
          navigate("/product");  // Redirect to the product page
        }, 1500);
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error('Error occurred in frontend during product submission:', error); // Log the error
      setError("Error occurred while adding the product.");
    }
  };

  return (
    <div className="add-product">
      <h2>Add New Product</h2>

      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Product Image</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            required
          />
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
