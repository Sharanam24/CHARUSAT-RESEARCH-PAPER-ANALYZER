/**
 * Papers Module for CHARUSAT Research Analyzer
 * 
 * This module handles the functionality for the papers page.
 * It manages filtering, table rendering, and paper detail display.
 */

/**
 * Store current filter state for persistence
 * 
 * This object maintains the currently selected filter values so that
 * when a user views a paper's details and returns to the papers list,
 * the filters remain applied (Requirement 3.5: Filter State Persistence).
 */
let currentFilters = {
    year: '',
    department: '',
    author: ''
};

/**
 * Initialize papers page when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    initializePapersPage();
});

/**
 * Initialize all papers page functionality
 */
async function initializePapersPage() {
    try {
        await populateFilterOptions();
        setupFilters();
        await loadAllPapers();
    } catch (error) {
        console.error('Error initializing papers page:', error);
    }
}

/**
 * Populate filter dropdown options
 */
async function populateFilterOptions() {
    try {
        // Populate year filter
        const years = await fetchYears();
        populateSelect('year-filter', years);
        
        // Populate department filter
        const departments = await fetchDepartments();
        populateSelect('department-filter', departments);
        
        // Populate author filter
        const authors = await fetchAllAuthors();
        const authorNames = authors.map(author => author.name);
        populateSelect('author-filter', authorNames);
    } catch (error) {
        console.error('Error populating filter options:', error);
    }
}

/**
 * Populate a select element with options
 * @param {string} selectId - ID of the select element
 * @param {Array} options - Array of option values
 */
function populateSelect(selectId, options) {
    const select = document.getElementById(selectId);
    
    if (!select) {
        console.warn(`Select element ${selectId} not found`);
        return;
    }
    
    // Keep the "All" option and add new options
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        select.appendChild(optionElement);
    });
}

/**
 * Set up filter functionality
 */
function setupFilters() {
    const applyButton = document.getElementById('apply-filters');
    
    if (!applyButton) {
        console.warn('Apply filters button not found');
        return;
    }
    
    applyButton.addEventListener('click', async () => {
        await applyFilters();
    });
}

/**
 * Apply selected filters and update papers table
 * 
 * This function retrieves the current filter values from the dropdown menus,
 * stores them in the currentFilters object for persistence, and fetches
 * papers that match ALL selected criteria (AND logic, not OR).
 */
async function applyFilters() {
    try {
        // Get filter values from dropdown menus
        // Empty string means "All" (no filter applied for that criterion)
        currentFilters = {
            year: document.getElementById('year-filter')?.value || '',
            department: document.getElementById('department-filter')?.value || '',
            author: document.getElementById('author-filter')?.value || ''
        };
        
        // Fetch papers that match ALL selected filter criteria
        // The API will apply AND logic: papers must match year AND department AND author
        const papers = await fetchFilteredPapers(currentFilters);
        renderPapersTable(papers);
    } catch (error) {
        console.error('Error applying filters:', error);
    }
}

/**
 * Load and display all papers
 */
async function loadAllPapers() {
    try {
        const papers = await fetchAllPapers();
        renderPapersTable(papers);
    } catch (error) {
        console.error('Error loading all papers:', error);
    }
}

/**
 * Render papers in the table
 * @param {Array} papers - Array of paper objects
 */
function renderPapersTable(papers) {
    const tbody = document.getElementById('papers-tbody');
    
    if (!tbody) {
        console.warn('Papers table body not found');
        return;
    }
    
    // Clear existing rows
    tbody.innerHTML = '';
    
    if (papers.length === 0) {
        const row = tbody.insertRow();
        const cell = row.insertCell();
        cell.colSpan = 5;
        cell.textContent = 'No papers found matching the selected criteria.';
        cell.className = 'no-results-cell';
        return;
    }
    
    // Create rows for each paper
    papers.forEach(paper => {
        const row = createPaperRow(paper);
        tbody.appendChild(row);
    });
}

/**
 * Create a table row for a paper
 * @param {Object} paper - Paper object
 * @returns {HTMLTableRowElement} Table row element
 */
function createPaperRow(paper) {
    const row = document.createElement('tr');
    
    // Title cell
    const titleCell = row.insertCell();
    titleCell.textContent = paper.title;
    
    // Authors cell
    const authorsCell = row.insertCell();
    authorsCell.textContent = paper.authors.join(', ');
    
    // Year cell
    const yearCell = row.insertCell();
    yearCell.textContent = paper.year;
    
    // Journal cell
    const journalCell = row.insertCell();
    journalCell.textContent = paper.journal;
    
    // Action cell with View button
    const actionCell = row.insertCell();
    const viewButton = document.createElement('button');
    viewButton.textContent = 'View';
    viewButton.className = 'view-btn';
    viewButton.setAttribute('data-id', paper.id);
    viewButton.addEventListener('click', () => showPaperDetails(paper.id));
    actionCell.appendChild(viewButton);
    
    return row;
}

/**
 * Show detailed information for a paper
 * @param {string} paperId - Paper ID
 */
async function showPaperDetails(paperId) {
    try {
        const paper = await fetchPaperById(paperId);
        
        if (!paper) {
            console.error('Paper not found');
            return;
        }
        
        // Update detail fields
        document.getElementById('detail-title').textContent = paper.title;
        document.getElementById('detail-authors').textContent = paper.authors.join(', ');
        document.getElementById('detail-year').textContent = paper.year;
        document.getElementById('detail-journal').textContent = paper.journal;
        document.getElementById('detail-department').textContent = paper.department;
        
        // Show abstract if available
        const abstractRow = document.getElementById('detail-abstract-row');
        if (paper.abstract) {
            document.getElementById('detail-abstract').textContent = paper.abstract;
            abstractRow.classList.remove('hidden');
        } else {
            abstractRow.classList.add('hidden');
        }
        
        // Show details section
        const detailsSection = document.getElementById('paper-details');
        detailsSection.classList.remove('hidden');
        
        // Scroll to details
        detailsSection.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Error showing paper details:', error);
    }
}

/**
 * Set up close button for paper details
 */
document.addEventListener('DOMContentLoaded', () => {
    const closeButton = document.getElementById('close-details');
    
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            const detailsSection = document.getElementById('paper-details');
            detailsSection.classList.add('hidden');
        });
    }
});
