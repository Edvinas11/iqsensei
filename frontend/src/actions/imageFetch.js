import axios from "axios";

export const fetchImage = async (url) => {
    const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}${url}`, {
        responseType: "blob" // Set responseType to 'blob' to receive a Blob object
      });
    return response.data;
};