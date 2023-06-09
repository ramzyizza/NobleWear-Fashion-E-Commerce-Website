import { useRouter } from "next/router";
import { useState } from "react";

const AddProductImage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();
  const { pid } = router.query;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const productImage = {
      PRODUCT_ID: pid,
      URL: imageUrl,
    };

    try {
      const response = await fetch("http://localhost:5000/products/add/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productImage),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        console.log("Product saved to the server.");
        // Reset the form fields
        setImageUrl("");
        router.push("/admin");
      } else {
        console.error("Failed to save the product to the server.");
      }
    } catch (error) {
      console.error("An error occurred while saving the product:", error);
    }

    // Rest of your code for handling the form submission

    console.log(productImage);
  };

  return (
    <div>
      <div className="navbar">
        {/* <a href="products.html" target="_blank">
          ADD PRODUCT IMAGE
        </a>
        <a href="index.html" target="_blank">
          ADMIN PANEL
        </a> */}
      </div>
      <div id="container">
        <div className="admin-order">
          <h1 className="admin-h1">Add Product</h1>
          <h2 className="admin-h2">Admin & Seller Panel</h2>
        </div>
        <div className="div-form">
          <form
            className="cont-form form-update"
            id="form"
            onSubmit={handleSubmit}
          >
            <input
              className="cont-form-item mantap-item"
              required
              type="text"
              id="imageUrl"
              placeholder="Enter Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <button className="btn-submit" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductImage;
