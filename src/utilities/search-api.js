// search-api.js

// Define the base URL for your backend API
const BASE_URL = '/api/search';

// Function to search for items
export async function searchItems(query) {
  try {
    // Make a GET request to the search endpoint with the query string
    const response = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(query)}`);

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Failed to search for items: ${response.statusText}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // Return the search results
    return data;
  } catch (error) {
    // Handle errors
    console.error('Error searching for items:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
