import axios from 'axios';

const getApi = async (url:any,headers:any = null) => {
    try {
        const options = headers ? { headers } : {};
        const response = await axios.get(`${process.env.BASE_URL}${url}`,options);
        return response.data; // Return the response data for further use
    } catch (error) {
        console.error("Error:", error);
        throw error; // Throw the error so the calling function can handle it
    }
};

export default getApi;
