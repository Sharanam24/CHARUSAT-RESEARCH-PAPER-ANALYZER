# Implementation Plan: CHARUSAT Research Analyzer

## Overview

This implementation plan breaks down the CHARUSAT Research Analyzer into discrete coding tasks. The approach follows a bottom-up strategy: starting with the foundational API module and shared components, then building each page incrementally with its specific functionality, and finally integrating everything together with testing.

The implementation uses pure HTML, CSS, and vanilla JavaScript without any frameworks, ensuring a lightweight and maintainable codebase suitable for an academic project.

## Tasks

- [x] 1. Set up project structure and create base HTML template
  - Create folder structure: css/, js/, and root HTML files
  - Create a base HTML template with semantic structure, navigation bar, and common elements
  - Link stylesheet and common JavaScript files
  - _Requirements: 1.1, 9.1, 9.3_

- [ ] 2. Implement CSS design system and layout foundations
  - [x] 2.1 Create CSS variables for color scheme and typography
    - Define CSS custom properties for primary color (#0B3C5D), accent color (#328CC1), backgrounds, and fonts
    - Set up base typography using Times New Roman or Roboto
    - _Requirements: 8.1, 8.2, 8.3, 8.4_
  
  - [x] 2.2 Implement navigation bar styling with Flexbox
    - Style the navigation bar with dark blue background and white text
    - Add hover effects with light blue accent color
    - Use Flexbox for layout
    - _Requirements: 7.1, 8.5_
  
  - [x] 2.3 Create reusable component styles (cards, tables, buttons, forms)
    - Style dashboard cards using CSS Grid
    - Style papers table with proper spacing and borders
    - Style buttons and form controls with consistent appearance
    - _Requirements: 7.1, 7.2_
  
  - [x] 2.4 Implement responsive layout with media queries
    - Add media queries for tablet breakpoints (max-width: 768px)
    - Adjust grid and flexbox layouts for smaller screens
    - _Requirements: 7.4_
  
  - [ ]* 2.5 Write property test for CSS color scheme compliance
    - **Property 15: Color Scheme Compliance**
    - **Validates: Requirements 8.1, 8.2, 8.3**
  
  - [ ]* 2.6 Write property test for font family specification
    - **Property 16: Font Family Specification**
    - **Validates: Requirements 8.4**
  
  - [ ]* 2.7 Write property test for animation restriction
    - **Property 17: Animation Restriction**
    - **Validates: Requirements 8.5**

- [x] 3. Implement API module with placeholder endpoints
  - [x] 3.1 Create api.js with base URL constant and fetch wrapper functions
    - Define API_BASE_URL constant
    - Implement fetchDashboardStats(), searchPapers(), fetchFilteredPapers(), fetchPaperById(), fetchAllPapers()
    - Implement fetchAuthorGroups(), fetchAllAuthors()
    - Implement fetchAnalyticsData(), fetchYears(), fetchDepartments()
    - Add error handling with try/catch blocks
    - Return mock data when API calls fail
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_
  
  - [ ]* 3.2 Write property test for fetch API usage
    - **Property 19: Fetch API Usage**
    - **Validates: Requirements 10.1**
  
  - [ ]* 3.3 Write property test for configurable API endpoints
    - **Property 20: Configurable API Endpoints**
    - **Validates: Requirements 10.2**
  
  - [ ]* 3.4 Write property test for asynchronous API handling
    - **Property 21: Asynchronous API Handling**
    - **Validates: Requirements 10.3**
  
  - [ ]* 3.5 Write property test for API error handling
    - **Property 22: API Error Handling**
    - **Validates: Requirements 10.5**
  
  - [ ]* 3.6 Write unit tests for API error scenarios
    - Test network failures return safe defaults
    - Test malformed responses are handled gracefully
    - _Requirements: 10.5_

- [x] 4. Build Home/Dashboard page
  - [x] 4.1 Create index.html with dashboard structure
    - Add navigation bar
    - Create dashboard cards section with three cards (Total Papers, Total Authors, Departments)
    - Add search bar section
    - Add papers published per year chart section
    - Use semantic HTML5 tags (main, section, article)
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_
  
  - [x] 4.2 Implement dashboard.js for loading and displaying statistics
    - Create loadDashboardStats() function to fetch and display card values
    - Implement setupSearch() function for search functionality
    - Add event listeners for search button and Enter key
    - Implement displaySearchResults() to show search results
    - Add input sanitization for search queries
    - _Requirements: 1.2, 2.1, 2.2, 2.4_
  
  - [ ]* 4.3 Write property test for search query matching
    - **Property 2: Search Query Matching**
    - **Validates: Requirements 2.1**
  
  - [ ]* 4.4 Write property test for search results metadata
    - **Property 3: Search Results Include Required Metadata**
    - **Validates: Requirements 2.3**
  
  - [ ]* 4.5 Write unit tests for dashboard functionality
    - Test empty search returns all papers
    - Test dashboard cards display correct values
    - Test search without page reload
    - _Requirements: 1.2, 2.2, 2.4_

- [x] 5. Build Papers page with filtering
  - [x] 5.1 Create papers.html with filter section and papers table
    - Add filter section with Year, Department, and Author dropdowns
    - Create papers table with columns: Title, Authors, Year, Journal, View
    - Add paper details section (initially hidden)
    - Use semantic HTML5 tags
    - _Requirements: 3.1, 3.3, 9.3_
  
  - [x] 5.2 Implement papers.js for filtering and table rendering
    - Create setupFilters() to populate filter dropdowns and handle filter application
    - Implement renderPapersTable() to display papers in table format
    - Create createPaperRow() helper function
    - Implement showPaperDetails() for View button functionality
    - Add filter state persistence logic
    - _Requirements: 3.2, 3.4, 3.5_
  
  - [ ]* 5.3 Write property test for filter criteria conjunction
    - **Property 4: Filter Criteria Conjunction**
    - **Validates: Requirements 3.2**
  
  - [ ]* 5.4 Write property test for papers table structure
    - **Property 5: Papers Table Structure**
    - **Validates: Requirements 3.3**
  
  - [ ]* 5.5 Write property test for view button behavior
    - **Property 6: View Button Displays Paper Details**
    - **Validates: Requirements 3.4**
  
  - [ ]* 5.6 Write property test for filter state persistence
    - **Property 7: Filter State Persistence**
    - **Validates: Requirements 3.5**
  
  - [ ]* 5.7 Write unit tests for papers page functionality
    - Test filter with no matches returns empty results
    - Test clicking View button shows correct paper details
    - Test filter dropdowns populate correctly
    - _Requirements: 3.2, 3.4_

- [x] 6. Build Duplicate Author Analyzer page
  - [x] 6.1 Create authors.html with author groups display structure
    - Add container for author groups
    - Create template structure for displaying grouped authors with similarity scores
    - Use semantic HTML5 tags
    - _Requirements: 4.1, 9.3_
  
  - [x] 6.2 Implement authors.js for loading and rendering author groups
    - Create loadAuthorGroups() function to fetch author group data
    - Implement renderAuthorGroups() to display all groups
    - Create createAuthorGroupElement() helper to build individual group HTML
    - Ensure each group shows status message and similarity scores
    - _Requirements: 4.2, 4.3_
  
  - [ ]* 6.3 Write property test for author group similarity scores
    - **Property 8: Author Groups Include Similarity Scores**
    - **Validates: Requirements 4.2**
  
  - [ ]* 6.4 Write property test for author group status display
    - **Property 9: Author Groups Display Status**
    - **Validates: Requirements 4.3**
  
  - [ ]* 6.5 Write unit tests for author analyzer functionality
    - Test author groups render correctly
    - Test similarity scores display for all variations
    - Test status message appears in each group
    - _Requirements: 4.2, 4.3_

- [x] 7. Build Analytics page with charts
  - [x] 7.1 Create analytics.html with chart sections
    - Add three chart sections: Publications by Year, Top Research Domains, Department-wise Paper Count
    - Use canvas elements or placeholder divs for charts
    - Add headings/labels for each chart
    - Use semantic HTML5 tags
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_
  
  - [x] 7.2 Implement analytics.js for loading and rendering charts
    - Create loadAnalytics() function to fetch analytics data
    - Implement renderPublicationsChart() for publications by year
    - Implement renderDomainsChart() for top research domains
    - Implement renderDepartmentsChart() for department-wise counts
    - Use canvas API or create simple bar chart visualizations with divs
    - _Requirements: 5.1, 5.2, 5.3_
  
  - [ ]* 7.3 Write property test for chart element types
    - **Property 10: Chart Element Types**
    - **Validates: Requirements 5.4**
  
  - [ ]* 7.4 Write property test for chart labels
    - **Property 11: Charts Have Labels**
    - **Validates: Requirements 5.5**
  
  - [ ]* 7.5 Write unit tests for analytics functionality
    - Test all three charts render on page load
    - Test charts have proper labels
    - Test chart data displays correctly
    - _Requirements: 5.1, 5.2, 5.3, 5.5_

- [x] 8. Create About page
  - [x] 8.1 Create about.html with project information
    - Add project description section
    - Add AI/ML technologies section listing duplicate detection algorithms
    - Add developer details section indicating student project
    - Use semantic HTML5 tags and academic styling
    - _Requirements: 6.1, 6.2, 6.3, 9.3_
  
  - [ ]* 8.2 Write unit tests for About page content
    - Test project description is present
    - Test AI/ML technologies section exists
    - Test developer details section exists
    - _Requirements: 6.1, 6.2, 6.3_

- [x] 9. Implement cross-cutting concerns and polish
  - [x] 9.1 Add script loading optimization
    - Add defer or async attributes to all script tags
    - Ensure scripts don't block page rendering
    - _Requirements: 11.3_
  
  - [x] 9.2 Verify separation of concerns across all files
    - Remove any inline styles or inline scripts
    - Ensure all CSS is in external stylesheets
    - Ensure all JavaScript is in external modules
    - _Requirements: 9.4_
  
  - [x] 9.3 Add code comments and documentation
    - Add JSDoc comments to all functions
    - Add explanatory comments for complex logic
    - Add README.md with project overview and setup instructions
    - _Requirements: 9.2_
  
  - [ ]* 9.4 Write property test for semantic HTML usage
    - **Property 1: Semantic HTML Usage**
    - **Validates: Requirements 1.5, 9.3**
  
  - [ ]* 9.5 Write property test for separation of concerns
    - **Property 18: Separation of Concerns**
    - **Validates: Requirements 9.4**
  
  - [ ]* 9.6 Write property test for non-blocking script loading
    - **Property 23: Non-Blocking Script Loading**
    - **Validates: Requirements 11.3**
  
  - [ ]* 9.7 Write property tests for CSS layout usage
    - **Property 12: Flexbox Layout Usage**
    - **Property 13: CSS Grid Layout Usage**
    - **Property 14: Responsive Media Queries**
    - **Validates: Requirements 7.1, 7.2, 7.4**

- [x] 10. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Final integration and testing
  - [x] 11.1 Test navigation between all pages
    - Verify all navigation links work correctly
    - Test that active page is highlighted in navigation
    - Ensure consistent navigation experience across all pages
    - _Requirements: 1.1_
  
  - [x] 11.2 Verify responsive design on different screen sizes
    - Test desktop layout (1920x1080, 1366x768)
    - Test tablet layout (768x1024, 834x1194)
    - Ensure all content is readable and accessible
    - _Requirements: 7.3, 7.4, 7.5_
  
  - [x] 11.3 Perform cross-browser compatibility testing
    - Test on Chrome, Firefox, Safari, Edge
    - Verify all functionality works consistently
    - Fix any browser-specific issues
    - _Requirements: 11.1_
  
  - [ ]* 11.4 Run complete property test suite
    - Execute all 23 property tests with 100 iterations each
    - Verify all properties pass
    - Fix any failures discovered
    - _All Requirements_
  
  - [ ]* 11.5 Run complete unit test suite
    - Execute all unit tests
    - Verify edge cases and error conditions are handled
    - Achieve comprehensive test coverage
    - _All Requirements_

- [x] 12. Final checkpoint - Ensure all tests pass and project is complete
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests validate universal correctness properties with 100+ iterations
- Unit tests validate specific examples and edge cases
- The implementation follows a bottom-up approach: foundation → pages → integration
- Mock data should be used in API functions during development
- All JavaScript should use ES6+ features (const/let, arrow functions, async/await)
- Focus on clean, well-commented code suitable for an academic project
