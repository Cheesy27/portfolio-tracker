import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/holdings';

export const getHoldings = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
};

export const addHolding = async (holding) => {
    const response = await axios.post(BASE_URL, holding);
    return response.data;
};

export const deleteHolding = async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
};