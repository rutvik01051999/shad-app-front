// src/api/olakrutrimApi.js
import axios from 'axios';

// Example of setting up the base URL (replace with actual base URL)
const BASE_URL = 'https://api.olamaps.io'; // Replace with the actual base URL from their documentation
const API_KEY = 'bTuvAab81VahZp3qcEMqn5qiyvX1BI4Lh72yAw0h'; // Replace with your actual API key

// Example of a function to get nearby cities or other data from the API
export const getNearbyCities = async (latitude, longitude) => {
  try {
    const response = await axios.get(`${BASE_URL}/places/v1/autocomplete`, {
      params: {
        input: 'landmark',  // Use the input as the query
        location: `${latitude},${longitude}`,
        api_key: API_KEY,
      },
      headers: {
        'Authorization': `Bearer ${API_KEY}`, // Include your API key if required
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching nearby cities:', error);
    throw error;
  }
};

// Example of another function if the API has different endpoints
export const getWeather = async (latitude, longitude) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat: latitude,
        lon: longitude,
      },
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
