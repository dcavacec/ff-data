// /scripts/fetchAndNormalize.js


// QB
// Running Backs
// Wide Receivers
// Tight Ends
// Kickers
// Defense/Special Teams

// for each position, do the following
import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import fs from 'fs/promises';

// Function to fetch HTML from a URL
async function fetchHTML(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const html = await response.text();
        return html;
    } catch (error) {
        console.error(`Error fetching HTML from ${url}:`, error);
        throw error; // Re-throwing the error for further handling
    }
}

// Function to normalize and parse HTML
function normalizeHTML(html) {
    try {
        const dom = new JSDOM(html);
        const document = dom.window.document;

        // Example: Extract the title of the page
        const title = document.querySelector('title')?.textContent?.trim() || 'No title found';
        
        // You can add more data extraction logic here
        
        console.log('Page title:', title);
        return { title };
    } catch (error) {
        console.error('Error parsing HTML:', error);
        throw error; // Re-throwing the error for further handling
    }
}

// Function to save data to a file
async function saveData(data, filePath) {
    try {
        const jsonData = JSON.stringify(data, null, 2);
        await fs.writeFile(filePath, jsonData, 'utf8');
        console.log(`Data successfully saved to ${filePath}`);
    } catch (error) {
        console.error(`Error saving data to ${filePath}:`, error);
        throw error; // Re-throwing the error for further handling
    }
}

// Example usage of the functions
async function fetchNormalizeAndSave(url, filePath) {
    try {
        const html = await fetchHTML(url);
        const normalizedData = normalizeHTML(html);
        await saveData(normalizedData, filePath);
    } catch (error) {
        console.error('An error occurred during the process:', error);
    }
}

// Usage example
fetchNormalizeAndSave('https://example.com', './data.json');
