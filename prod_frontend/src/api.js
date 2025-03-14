// import axios from 'axios';

// const API_BASE_URL = 'http://127.0.0.1:5000'; // Change to your backend URL

// export const getProducts = () => axios.get(`${API_BASE_URL}/list_products`);
// export const addProduct = (product) => axios.post(`${API_BASE_URL}/add_product`, product);
// export const updateProduct = (productID, product) => axios.put(`${API_BASE_URL}/update_product/${productID}`, product);
// export const deleteProduct = (productID) => axios.delete(`${API_BASE_URL}/delete_product/${productID}`);
// export const clearList = () => axios.delete(`${API_BASE_URL}/clear_products`);

import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000'; // Change to your backend URL

export const getProducts = () => axios.get(`${API_BASE_URL}/list_products`);
export const addProduct = (product) => axios.post(`${API_BASE_URL}/add_product`, product);
export const updateProduct = (productID, product) => axios.put(`${API_BASE_URL}/update_product/${productID}`, product);
export const deleteProduct = (productID) => axios.delete(`${API_BASE_URL}/delete_product/${productID}`);
export const clearList = () => axios.delete(`${API_BASE_URL}/clear_products`);

// Upload image function
// export const uploadImage = async (imageFile) => {
//     const formData = new FormData();
//     formData.append('image', imageFile);

//     const response = await axios.post(`${API_BASE_URL}/upload_image`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//     });
//     console.log(response.data.imageUrl);
//     return response.data.imageUrl; // Backend should return the image URL
// };

// export const get_url=(product)=>axios.get(`${API_BASE_URL}/get_url/`,product);
export const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        const response = await axios.post(`${API_BASE_URL}/upload_image`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        console.log("Full API Response:", response.data);  // 🔍 Debug the full response

        if (!response.data || !response.data.image_url) {
            throw new Error("Invalid response from server");
        }

        return response.data.image_url;
    } catch (error) {
        console.error("Upload error:", error);
        return null;
    }
};
