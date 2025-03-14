// import React, { useState } from 'react';

// const AddProductForm = ({ onAdd }) => {
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [category, setCategory] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!name || !price || !category) return;
//     onAdd({ name, price: parseFloat(price), category });
//     setName('');
//     setPrice('');
//     setCategory('');
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
//       <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
//       <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
//       <button type="submit">Add Product</button>
//     </form>
//   );
// };

// export default AddProductForm;
import React, { useState } from 'react';

const AddProductForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && !file.type.startsWith("image/")) {
      setError("Please upload a valid image file (JPG, PNG).");
      return;
    }

    setImage(file);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !category) {
      setError("All fields are required.");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category);
    if (image) formData.append('image', image);

    try {
      await onAdd(formData);
      setName('');
      setPrice('');
      setCategory('');
      setImage(null);
      setError('');
    } catch (err) {
      console.error('Error adding product:', err);
      setError('Failed to add product.');
    }

    setUploading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4 border rounded shadow-md w-96">
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="border p-2 rounded"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" disabled={uploading} className="bg-blue-500 text-white p-2 rounded">
        {uploading ? 'Uploading...' : 'Add Product'}
      </button>
    </form>
  );
};

export default AddProductForm;
