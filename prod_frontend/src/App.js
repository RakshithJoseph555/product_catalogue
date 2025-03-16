import React, { useEffect, useState } from "react";
import { addProduct,getProducts, updateProduct, deleteProduct, clearList } from "./api";
import ProductList from "./ProductList";
import ClearAllButton from "./ClearAllButton";
import AddProductForm from "./AddProductForm";
import "./styles.css";
const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await getProducts();
    setProducts(response.data);
  };

  const handleUpdate = async (id, updatedProduct) => {
    await updateProduct(id, updatedProduct);
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  const handleClearAll = async () => {
    await clearList();
    setProducts([]);
  };

  const addProd = async(product) => {
    await addProduct(product);
    fetchProducts();
  }
  return (
    <div>
      <h1 className="pagehead">Product Catalogue</h1>
      <AddProductForm onAdd={addProd} />
      <ProductList products={products} onDelete={handleDelete} onUpdate={handleUpdate} />
      <ClearAllButton onClear={handleClearAll} />
    </div>
  );
};

export default App;
