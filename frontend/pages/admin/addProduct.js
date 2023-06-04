import { useState } from "react";
import { useRouter } from "next/router";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const product = {
      NAME: name,
      CATEGORY: category,
      CURRENT_PRICE: currentPrice,
      PRICE: price,
      DISCOUNT: discount,
      QUANTITY: quantity,
      SIZE: size,
      COLOR: color,
    };

    try {
      const response = await fetch("http://localhost:5000/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        console.log("Product saved to the server.");
        // Reset the form fields
        setName("");
        setCategory("");
        setCurrentPrice("");
        setDiscount("");
        setQuantity("");
        setSize("");
        setColor("");
        setPrice("");

        const productId = data.data.product_id;

        router.push(`/admin/addImage?pid=${productId}`);
      } else {
        console.error("Failed to save the product to the server.");
      }
    } catch (error) {
      console.error("An error occurred while saving the product:", error);
    }
  };

  return (
    <div>
      <div className="navbar">
        <a href="products.html" target="_blank">
          PRODUCTS
        </a>
        <a href="index.html" target="_blank">
          ADMIN PANEL
        </a>
      </div>
      <div id="container">
        <h1>Add Product</h1>
        <form id="form" onSubmit={handleSubmit}>
          <input
            required
            type="text"
            id="name"
            placeholder="Enter Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            required
            type="text"
            id="category"
            placeholder="Enter Product Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            required
            type="text"
            id="currentPrice"
            placeholder="Enter Product Current Price"
            value={currentPrice}
            onChange={(e) => setCurrentPrice(e.target.value)}
          />
          <input
            required
            type="number"
            id="price"
            placeholder="Enter Product Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <select
            id="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
          <select
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          >
            <option value="">Is the Product Sold?</option>
            <option value="Grey">Grey</option>
            <option value="Black">Black</option>
            <option value="White">White</option>
          </select>
          <input
            required
            type="number"
            id="discount"
            placeholder="Enter Discount Price"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
          <input
            required
            type="number"
            id="quantity"
            placeholder="Enter Product Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
