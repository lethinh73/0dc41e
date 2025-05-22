// fetchData.js - A simple Fetch API library

/**
 * Fetch data from the given URL with provided options.
 * @param {string} url The URL to fetch data from.
 * @param {object} [options={}] Options to pass to the fetch request.
 * @returns {Promise<any>} Returns a promise that resolves with the JSON data.
 */
export async function fetchData(url, options = {}) {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}