/**
 * API Module for CHARUSAT Research Analyzer
 * 
 * This module handles all backend communication using the Fetch API.
 * It provides functions for fetching dashboard statistics, papers, authors, and analytics data.
 * All functions include error handling and return mock data during development.
 */

// API Configuration
// Backend server URL - Update this if backend runs on different host/port
const API_BASE_URL = 'http://localhost:8000/api'; // FastAPI backend URL

/**
 * Mock Data for Development
 */
const MOCK_PAPERS = [
    {
        id: '1',
        title: 'Machine Learning Applications in Healthcare',
        authors: ['Dr. John Smith', 'Dr. Jane Doe'],
        year: 2023,
        journal: 'International Journal of AI',
        department: 'Computer Science',
        abstract: 'This paper explores the application of machine learning algorithms in healthcare diagnostics.',
        keywords: ['Machine Learning', 'Healthcare', 'AI'],
        doi: '10.1234/ijai.2023.001'
    },
    {
        id: '2',
        title: 'Blockchain Technology in Supply Chain Management',
        authors: ['Prof. Alice Johnson', 'Dr. Bob Williams'],
        year: 2023,
        journal: 'Journal of Information Technology',
        department: 'Information Technology',
        abstract: 'An analysis of blockchain implementation in modern supply chain systems.',
        keywords: ['Blockchain', 'Supply Chain', 'Technology'],
        doi: '10.1234/jit.2023.002'
    },
    {
        id: '3',
        title: 'IoT-Based Smart Home Automation Systems',
        authors: ['Dr. John Smith', 'Prof. Carol Davis'],
        year: 2022,
        journal: 'IEEE Transactions on Electronics',
        department: 'Electronics',
        abstract: 'Design and implementation of IoT-based smart home automation.',
        keywords: ['IoT', 'Smart Home', 'Automation'],
        doi: '10.1234/ieee.2022.003'
    },
    {
        id: '4',
        title: 'Renewable Energy Systems for Sustainable Development',
        authors: ['Dr. David Brown', 'Dr. Emma Wilson'],
        year: 2022,
        journal: 'Journal of Mechanical Engineering',
        department: 'Mechanical Engineering',
        abstract: 'Study of renewable energy systems and their impact on sustainability.',
        keywords: ['Renewable Energy', 'Sustainability', 'Engineering'],
        doi: '10.1234/jme.2022.004'
    },
    {
        id: '5',
        title: 'Deep Learning for Natural Language Processing',
        authors: ['Dr. J. Smith', 'Prof. Frank Miller'],
        year: 2021,
        journal: 'ACM Computing Surveys',
        department: 'Computer Science',
        abstract: 'Comprehensive survey of deep learning techniques in NLP.',
        keywords: ['Deep Learning', 'NLP', 'AI'],
        doi: '10.1234/acm.2021.005'
    },
    {
        id: '6',
        title: 'Cybersecurity Threats in Cloud Computing',
        authors: ['Dr. Grace Lee', 'Dr. Henry Taylor'],
        year: 2021,
        journal: 'Journal of Information Technology',
        department: 'Information Technology',
        abstract: 'Analysis of security threats and mitigation strategies in cloud environments.',
        keywords: ['Cybersecurity', 'Cloud Computing', 'Security'],
        doi: '10.1234/jit.2021.006'
    }
];

const MOCK_AUTHOR_GROUPS = [
    {
        groupId: 'group-1',
        primaryName: 'Dr. John Smith',
        variations: [
            { name: 'Dr. John Smith', similarityScore: 100 },
            { name: 'Dr. J. Smith', similarityScore: 95 },
            { name: 'John Smith', similarityScore: 92 }
        ],
        status: 'Identified as same author'
    },
    {
        groupId: 'group-2',
        primaryName: 'Dr. Jane Doe',
        variations: [
            { name: 'Dr. Jane Doe', similarityScore: 100 },
            { name: 'J. Doe', similarityScore: 88 }
        ],
        status: 'Identified as same author'
    },
    {
        groupId: 'group-3',
        primaryName: 'Prof. Alice Johnson',
        variations: [
            { name: 'Prof. Alice Johnson', similarityScore: 100 },
            { name: 'A. Johnson', similarityScore: 90 },
            { name: 'Alice M. Johnson', similarityScore: 85 }
        ],
        status: 'Identified as same author'
    }
];

const MOCK_AUTHORS = [
    { id: '1', name: 'Dr. John Smith', department: 'Computer Science', paperCount: 2 },
    { id: '2', name: 'Dr. Jane Doe', department: 'Computer Science', paperCount: 1 },
    { id: '3', name: 'Prof. Alice Johnson', department: 'Information Technology', paperCount: 1 },
    { id: '4', name: 'Dr. Bob Williams', department: 'Information Technology', paperCount: 1 },
    { id: '5', name: 'Prof. Carol Davis', department: 'Electronics', paperCount: 1 },
    { id: '6', name: 'Dr. David Brown', department: 'Mechanical Engineering', paperCount: 1 },
    { id: '7', name: 'Dr. Emma Wilson', department: 'Mechanical Engineering', paperCount: 1 },
    { id: '8', name: 'Prof. Frank Miller', department: 'Computer Science', paperCount: 1 },
    { id: '9', name: 'Dr. Grace Lee', department: 'Information Technology', paperCount: 1 },
    { id: '10', name: 'Dr. Henry Taylor', department: 'Information Technology', paperCount: 1 }
];

const MOCK_ANALYTICS = {
    publicationsByYear: [
        { year: 2021, count: 2 },
        { year: 2022, count: 2 },
        { year: 2023, count: 2 }
    ],
    topDomains: [
        { domain: 'Artificial Intelligence', count: 3 },
        { domain: 'Information Technology', count: 3 },
        { domain: 'IoT & Electronics', count: 1 },
        { domain: 'Renewable Energy', count: 1 }
    ],
    departmentCounts: [
        { department: 'Computer Science', count: 3 },
        { department: 'Information Technology', count: 3 },
        { department: 'Electronics', count: 1 },
        { department: 'Mechanical Engineering', count: 1 }
    ]
};

const MOCK_YEARS = [2021, 2022, 2023];
const MOCK_DEPARTMENTS = ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical Engineering'];

/**
 * Dashboard API Functions
 */

/**
 * Fetch dashboard statistics (total papers, authors, departments)
 * 
 * This function attempts to fetch real data from the backend API.
 * If the API call fails (network error, server down, etc.), it falls back
 * to mock data to allow development and testing without a backend.
 * 
 * @returns {Promise<Object>} Dashboard statistics object with totalPapers, totalAuthors, totalDepartments
 */
async function fetchDashboardStats() {
    try {
        const response = await fetch(`${API_BASE_URL}/dashboard/stats`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        console.warn('Using mock data for development');
        // Return mock data for development - allows frontend to work without backend
        return {
            totalPapers: MOCK_PAPERS.length,
            totalAuthors: MOCK_AUTHORS.length,
            totalDepartments: MOCK_DEPARTMENTS.length
        };
    }
}

/**
 * Paper API Functions
 */

/**
 * Search papers by query (title, author, or year)
 * 
 * This function searches for papers matching the query string in three fields:
 * title, author names, or publication year. The search is case-insensitive
 * and uses partial matching (substring search).
 * 
 * @param {string} query - Search query string
 * @returns {Promise<Array>} Array of matching papers
 */
async function searchPapers(query) {
    try {
        const response = await fetch(`${API_BASE_URL}/papers/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error searching papers:', error);
        console.warn('Using mock data for development');
        // Return filtered mock data for development
        // Empty query returns all papers (Requirement 2.2)
        if (!query || query.trim() === '') {
            return MOCK_PAPERS;
        }
        // Case-insensitive search across title, authors, and year
        const lowerQuery = query.toLowerCase();
        return MOCK_PAPERS.filter(paper => 
            paper.title.toLowerCase().includes(lowerQuery) || // Search in title
            paper.authors.some(author => author.toLowerCase().includes(lowerQuery)) || // Search in any author name
            paper.year.toString().includes(lowerQuery) // Search in year
        );
    }
}

/**
 * Fetch papers with applied filters
 * 
 * This function applies multiple filter criteria using AND logic:
 * papers must match ALL selected filters simultaneously (not OR).
 * Empty filter values are ignored (treated as "All").
 * 
 * Example: If year=2023 AND department="Computer Science", only papers
 * from 2023 in Computer Science department are returned.
 * 
 * @param {Object} filters - Filter criteria {year, department, author}
 * @returns {Promise<Array>} Array of filtered papers
 */
async function fetchFilteredPapers(filters) {
    try {
        const params = new URLSearchParams();
        if (filters.year) params.append('year', filters.year);
        if (filters.department) params.append('department', filters.department);
        if (filters.author) params.append('author', filters.author);
        
        const response = await fetch(`${API_BASE_URL}/papers/filter?${params.toString()}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching filtered papers:', error);
        console.warn('Using mock data for development');
        // Return filtered mock data for development
        // Apply AND logic: paper must match ALL non-empty filter criteria
        return MOCK_PAPERS.filter(paper => {
            // If year filter is set, paper year must match exactly
            if (filters.year && paper.year.toString() !== filters.year) return false;
            // If department filter is set, paper department must match exactly
            if (filters.department && paper.department !== filters.department) return false;
            // If author filter is set, paper must have that author in its authors array
            if (filters.author && !paper.authors.some(author => author === filters.author)) return false;
            // Paper passes all filters
            return true;
        });
    }
}

/**
 * Fetch a single paper by ID
 * @param {string} id - Paper ID
 * @returns {Promise<Object>} Paper object
 */
async function fetchPaperById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/papers/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching paper by ID:', error);
        console.warn('Using mock data for development');
        // Return mock paper for development
        return MOCK_PAPERS.find(paper => paper.id === id) || null;
    }
}

/**
 * Fetch all papers
 * @returns {Promise<Array>} Array of all papers
 */
async function fetchAllPapers() {
    try {
        const response = await fetch(`${API_BASE_URL}/papers`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching all papers:', error);
        console.warn('Using mock data for development');
        // Return mock papers for development
        return MOCK_PAPERS;
    }
}

/**
 * Author API Functions
 */

/**
 * Fetch author groups with duplicate detection
 * @returns {Promise<Array>} Array of author groups
 */
async function fetchAuthorGroups() {
    try {
        const response = await fetch(`${API_BASE_URL}/authors/groups`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching author groups:', error);
        console.warn('Using mock data for development');
        // Return mock author groups for development
        return MOCK_AUTHOR_GROUPS;
    }
}

/**
 * Fetch all authors
 * @returns {Promise<Array>} Array of all authors
 */
async function fetchAllAuthors() {
    try {
        const response = await fetch(`${API_BASE_URL}/authors`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching all authors:', error);
        console.warn('Using mock data for development');
        // Return mock authors for development
        return MOCK_AUTHORS;
    }
}

/**
 * Analytics API Functions
 */

/**
 * Fetch analytics data for charts
 * @returns {Promise<Object>} Analytics data object
 */
async function fetchAnalyticsData() {
    try {
        const response = await fetch(`${API_BASE_URL}/analytics`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching analytics data:', error);
        console.warn('Using mock data for development');
        // Return mock analytics data for development
        return MOCK_ANALYTICS;
    }
}

/**
 * Filter Options API Functions
 */

/**
 * Fetch available years for filtering
 * @returns {Promise<Array>} Array of years
 */
async function fetchYears() {
    try {
        const response = await fetch(`${API_BASE_URL}/filters/years`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching years:', error);
        console.warn('Using mock data for development');
        // Return mock years for development
        return MOCK_YEARS;
    }
}

/**
 * Fetch available departments for filtering
 * @returns {Promise<Array>} Array of department names
 */
async function fetchDepartments() {
    try {
        const response = await fetch(`${API_BASE_URL}/filters/departments`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching departments:', error);
        console.warn('Using mock data for development');
        // Return mock departments for development
        return MOCK_DEPARTMENTS;
    }
}
