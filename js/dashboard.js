/**
 * Dashboard Module for CHARUSAT Research Analyzer
 * 
 * This module handles the functionality for the home/dashboard page.
 * It loads and displays statistics, handles search functionality, and renders charts.
 */

/**
 * Initialize dashboard when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeDashboard();
});

/**
 * Initialize all dashboard functionality
 */
async function initializeDashboard() {
    try {
        await loadDashboardStats();
        setupSearch();
        // Chart rendering will be implemented in later tasks
    } catch (error) {
        console.error('Error initializing dashboard:', error);
    }
}

/**
 * Load and display dashboard statistics
 */
async function loadDashboardStats() {
    try {
        const stats = await fetchDashboardStats();
        updateDashboardCard('total-papers', stats.totalPapers);
        updateDashboardCard('total-authors', stats.totalAuthors);
        updateDashboardCard('total-departments', stats.totalDepartments);
    } catch (error) {
        console.error('Error loading dashboard stats:', error);
    }
}

/**
 * Update a dashboard card value
 * @param {string} elementId - ID of the element to update
 * @param {number} value - Value to display
 */
function updateDashboardCard(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = value;
    } else {
        console.warn(`Element ${elementId} not found`);
    }
}

/**
 * Set up search functionality
 */
function setupSearch() {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    
    if (!searchButton || !searchInput) {
        console.warn('Search elements not found');
        return;
    }
    
    // Handle search button click
    searchButton.addEventListener('click', async () => {
        await performSearch();
    });
    
    // Handle Enter key in search input
    searchInput.addEventListener('keypress', async (event) => {
        if (event.key === 'Enter') {
            await performSearch();
        }
    });
}

/**
 * Perform search operation
 */
async function performSearch() {
    try {
        const searchInput = document.getElementById('search-input');
        const query = sanitizeSearchQuery(searchInput.value);
        
        const results = await searchPapers(query);
        displaySearchResults(results);
    } catch (error) {
        console.error('Search error:', error);
        displayErrorMessage('Search failed. Please try again.');
    }
}

/**
 * Sanitize search query to prevent XSS attacks
 * 
 * This function removes potentially dangerous characters from user input
 * to prevent Cross-Site Scripting (XSS) attacks. It specifically removes
 * angle brackets (< and >) which could be used to inject HTML/JavaScript.
 * 
 * @param {string} query - Raw search query from user input
 * @returns {string} Sanitized query safe for processing
 */
function sanitizeSearchQuery(query) {
    if (!query || typeof query !== 'string') {
        return '';
    }
    // Remove potentially dangerous characters (< and >) and trim whitespace
    // This prevents injection of HTML tags or script elements
    return query.trim().replace(/[<>]/g, '');
}

/**
 * Display search results
 * @param {Array} results - Array of paper objects
 */
function displaySearchResults(results) {
    const resultsContainer = document.getElementById('search-results');
    
    if (!resultsContainer) {
        console.warn('Search results container not found');
        return;
    }
    
    // Clear previous results
    resultsContainer.innerHTML = '';
    
    if (results.length === 0) {
        resultsContainer.innerHTML = '<p class="no-results">No papers found matching your search.</p>';
        return;
    }
    
    // Create results list
    const resultsList = document.createElement('div');
    resultsList.className = 'results-list';
    
    results.forEach(paper => {
        const resultItem = createSearchResultItem(paper);
        resultsList.appendChild(resultItem);
    });
    
    resultsContainer.appendChild(resultsList);
}

/**
 * Create a search result item element
 * @param {Object} paper - Paper object
 * @returns {HTMLElement} Result item element
 */
function createSearchResultItem(paper) {
    const item = document.createElement('article');
    item.className = 'search-result-item';
    
    item.innerHTML = `
        <h3 class="result-title">${escapeHtml(paper.title)}</h3>
        <p class="result-authors"><strong>Authors:</strong> ${escapeHtml(paper.authors.join(', '))}</p>
        <p class="result-meta">
            <strong>Year:</strong> ${escapeHtml(paper.year.toString())} | 
            <strong>Journal:</strong> ${escapeHtml(paper.journal)}
        </p>
    `;
    
    return item;
}

/**
 * Display error message to user
 * @param {string} message - Error message to display
 */
function displayErrorMessage(message) {
    const resultsContainer = document.getElementById('search-results');
    
    if (resultsContainer) {
        resultsContainer.innerHTML = `<p class="error-message">${escapeHtml(message)}</p>`;
    }
}

/**
 * Escape HTML to prevent XSS attacks
 * 
 * This function converts potentially dangerous characters in user-provided
 * text into their HTML entity equivalents. By setting text as textContent
 * and then reading innerHTML, the browser automatically escapes special
 * characters like <, >, &, ", and '.
 * 
 * Example: "<script>alert('xss')</script>" becomes "&lt;script&gt;alert('xss')&lt;/script&gt;"
 * 
 * @param {string} text - Text to escape
 * @returns {string} Escaped text safe for HTML insertion
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text; // Browser automatically escapes special characters
    return div.innerHTML; // Return the escaped version
}
