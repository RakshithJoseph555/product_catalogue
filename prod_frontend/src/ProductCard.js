
import React, { useState } from "react";
import axios from "axios";
import { uploadImage } from "./api";
const ProductCard = ({ product, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [newImage, setNewImage] = useState(null);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
        setError("Please upload a valid image file (JPG, PNG).");
        return;
    }

    setUploading(true);
    setNewImage(file);

    try {
        console.log("Uploading image...");
        const img_url = await uploadImage(file);

        if (!img_url) {
            throw new Error("Image URL is undefined");
        }

        console.log("Uploaded Image URL:", img_url);
        setNewImageUrl(img_url);  
    } catch (error) {
        console.error("Image upload failed:", error);
        setError("Image upload failed.");
    } finally {
        setUploading(false);
    }

    setError("");
};



const handleUpdate = async () => {
    let finalImageUrl = updatedProduct.imageUrl; 

    if (newImage) {
        setUploading(true);
        try {
            console.log("Uploading new image...");
            const img_url = await uploadImage(newImage);
            
            if (!img_url) {
                throw new Error("Image upload failed: No URL received");
            }

            console.log("New image uploaded:", img_url);
            finalImageUrl = img_url;
            setNewImageUrl(img_url); 
        } catch (error) {
            console.error("Image upload error:", error);
            setError("Failed to upload image.");
            setUploading(false);
            return; 
        }
        setUploading(false);
    }

    setUpdatedProduct(prev => ({ ...prev, imageUrl: finalImageUrl }));

    onUpdate(product._id, { ...updatedProduct, imageUrl: finalImageUrl });

    setIsEditing(false);
};


  return (
    <div className="product-card">
      {isEditing ? (
        <>
          <input
            type="text"
            value={updatedProduct.name}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
          />
          <input
            type="number"
            value={updatedProduct.price}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
          />
            <input
            type="text"
            value={updatedProduct.category}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, category: e.target.value })}
          />
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {newImage && <img src={URL.createObjectURL(newImage)} alt="Preview" className="preview-img" />}
          <button className="bg-green-500" onClick={handleUpdate} disabled={uploading}>{uploading ? "Uploading..." : "Save"}</button>
          <button className="bg-red-500" onClick={()=>setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          {product.imageUrl && <img src={product.imageUrl} alt={product.name} className="product-image" />}
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
          <button onClick={() => setIsEditing(true)} className="bg-green-500">Update</button>
          <button onClick={() => onDelete(product._id) } className="bg-red-500">Delete</button>
        </>
      )}
    </div>
  );
};

export default ProductCard;
