import axios from 'axios';

// For CV Projects API (not your work API Gateway)
const apiGatewayAxiosInstance = axios.create({
    headers: {
        'accept': 'application/json'
    },
});

export const logError = (error) => {
    console.error(error);
};


export default apiGatewayAxiosInstance;
