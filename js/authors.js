/**
 * Authors Module for CHARUSAT Research Analyzer
 * 
 * This module handles the functionality for the duplicate author analyzer page.
 * It loads and displays author groups with similarity scores.
 */

/**
 * Initialize authors page when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeAuthorsPage();
});

/**
 * Initialize all authors page functionality
 */
async function initializeAuthorsPage() {
    try {
        await loadAuthorGroups();
    } catch (error) {
        console.error('Error initializing authors page:', error);
    }
}

/**
 * Load and display author groups
 */
async function loadAuthorGroups() {
    try {
        const groups = await fetchAuthorGroups();
        renderAuthorGroups(groups);
    } catch (error) {
        console.error('Error loading author groups:', error);
    }
}

/**
 * Render author groups in the container
 * @param {Array} groups - Array of author group objects
 */
function renderAuthorGroups(groups) {
    const container = document.getElementById('author-groups-container');
    
    if (!container) {
        console.warn('Author groups container not found');
        return;
    }
    
    // Clear existing content
    container.innerHTML = '';
    
    if (groups.length === 0) {
        container.innerHTML = '<p class="no-groups">No author groups detected yet.</p>';
        return;
    }
    
    // Create group elements
    groups.forEach((group, index) => {
        const groupElement = createAuthorGroupElement(group, index + 1);
        container.appendChild(groupElement);
    });
}

/**
 * Create an author group element
 * @param {Object} group - Author group object
 * @param {number} groupNumber - Group number for display
 * @returns {HTMLElement} Author group element
 */
function createAuthorGroupElement(group, groupNumber) {
    const groupDiv = document.createElement('article');
    groupDiv.className = 'author-group';
    
    // Group header
    const header = document.createElement('h3');
    header.className = 'group-header';
    header.textContent = `Author Group ${groupNumber}`;
    groupDiv.appendChild(header);
    
    // Primary name
    const primaryName = document.createElement('p');
    primaryName.className = 'primary-name';
    primaryName.innerHTML = `<strong>Primary Name:</strong> ${escapeHtml(group.primaryName)}`;
    groupDiv.appendChild(primaryName);
    
    // Status message
    const status = document.createElement('p');
    status.className = 'group-status';
    status.textContent = group.status || 'Identified as same author';
    groupDiv.appendChild(status);
    
    // Variations list
    const variationsList = document.createElement('ul');
    variationsList.className = 'author-variations';
    
    group.variations.forEach(variation => {
        const listItem = document.createElement('li');
        listItem.className = 'variation-item';
        
        const nameSpan = document.createElement('span');
        nameSpan.className = 'author-name';
        nameSpan.textContent = variation.name;
        
        const scoreSpan = document.createElement('span');
        scoreSpan.className = 'similarity-score';
        scoreSpan.textContent = `${variation.similarityScore}%`;
        
        listItem.appendChild(nameSpan);
        listItem.appendChild(scoreSpan);
        variationsList.appendChild(listItem);
    });
    
    groupDiv.appendChild(variationsList);
    
    return groupDiv;
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
