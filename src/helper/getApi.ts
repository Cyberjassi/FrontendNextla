import axios from 'axios';

const getApi = async (url:any) => {
    console.log("popular",url)
    try {
        const response = await axios.get(`${process.env.BASE_URL}${url}`);
        console.log("Data of favorite course:", response.data);
        return response.data; // Return the response data for further use
    } catch (error) {
        console.error("Error:", error);
        throw error; // Throw the error so the calling function can handle it
    }
};

export default getApi;
