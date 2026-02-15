# Requirements Document

## Introduction

The CHARUSAT Research Analyzer is a web-based research analysis portal designed for CHARUSAT University to collect, analyze, and manage research papers. The system's primary innovation is its AI/ML-powered duplicate author detection capability, which identifies and groups author name variations to maintain accurate research attribution and analytics.

## Glossary

- **System**: The CHARUSAT Research Analyzer web application
- **Research_Paper**: A scholarly publication with metadata including title, authors, year, journal, and department
- **Author**: An individual who has authored one or more research papers
- **Author_Variation**: Different name spellings or formats that refer to the same author
- **Similarity_Score**: A numerical value (0-100) indicating the likelihood that two author names refer to the same person
- **Dashboard**: The main landing page displaying aggregate statistics and search functionality
- **Filter**: A user interface control for narrowing down displayed research papers
- **Chart**: A visual representation of research analytics data
- **Department**: An academic department within CHARUSAT University
- **API**: Application Programming Interface for backend data operations

## Requirements

### Requirement 1: Display Research Dashboard

**User Story:** As a user, I want to view a comprehensive dashboard of research statistics, so that I can quickly understand the research output of CHARUSAT University.

#### Acceptance Criteria

1. WHEN a user loads the home page, THE System SHALL display a navigation bar containing links to Home, Papers, Authors, Analytics, and About pages
2. WHEN the dashboard loads, THE System SHALL display cards showing the total count of papers, total count of authors, and number of departments
3. WHEN the dashboard loads, THE System SHALL display a search bar for finding papers by title, author, or year
4. WHEN the dashboard loads, THE System SHALL display a section for visualizing papers published per year
5. THE System SHALL use semantic HTML5 tags for all dashboard components

### Requirement 2: Search Research Papers

**User Story:** As a researcher, I want to search for papers by title, author, or year, so that I can quickly find relevant research.

#### Acceptance Criteria

1. WHEN a user enters a search query, THE System SHALL filter papers matching the title, author name, or publication year
2. WHEN a user submits an empty search query, THE System SHALL display all available papers
3. WHEN search results are returned, THE System SHALL display them in a readable format with relevant metadata
4. THE System SHALL perform search operations using JavaScript without page reload

### Requirement 3: Browse and Filter Research Papers

**User Story:** As a user, I want to browse and filter research papers, so that I can find papers relevant to specific criteria.

#### Acceptance Criteria

1. WHEN a user navigates to the Papers page, THE System SHALL display a filter section with options for Year, Department, and Author
2. WHEN a user applies filters, THE System SHALL display only papers matching all selected filter criteria
3. WHEN papers are displayed, THE System SHALL show them in a table with columns: Title, Authors, Year, Journal, and View
4. WHEN a user clicks the View button, THE System SHALL display detailed information about the selected paper
5. THE System SHALL maintain filter state while viewing paper details

### Requirement 4: Detect Duplicate Authors Using AI/ML

**User Story:** As a research administrator, I want the system to identify duplicate author entries, so that I can maintain accurate author records and attribution.

#### Acceptance Criteria

1. WHEN the Duplicate Author Analyzer page loads, THE System SHALL display groups of author name variations that likely refer to the same person
2. FOR EACH author group, THE System SHALL display a similarity score indicating confidence level
3. WHEN author variations are grouped, THE System SHALL display a status message indicating "Identified as same author"
4. THE System SHALL visually distinguish between different author groups
5. THE System SHALL highlight the duplicate detection feature as the primary AI/ML capability

### Requirement 5: Visualize Research Analytics

**User Story:** As a research administrator, I want to view analytics about research output, so that I can understand research trends and productivity.

#### Acceptance Criteria

1. WHEN a user navigates to the Analytics page, THE System SHALL display a chart showing publications by year
2. WHEN the Analytics page loads, THE System SHALL display a chart showing top research domains
3. WHEN the Analytics page loads, THE System SHALL display a chart showing department-wise paper count
4. THE System SHALL use canvas elements or placeholder divs for chart rendering
5. THE System SHALL ensure all charts are readable and properly labeled

### Requirement 6: Display Project Information

**User Story:** As a visitor, I want to learn about the project and its technologies, so that I can understand its purpose and implementation.

#### Acceptance Criteria

1. WHEN a user navigates to the About page, THE System SHALL display a description of the project
2. WHEN the About page loads, THE System SHALL list the AI/ML technologies used in the system
3. WHEN the About page loads, THE System SHALL display developer details indicating this is a student project
4. THE System SHALL present information in an academic and professional style

### Requirement 7: Implement Responsive Layout

**User Story:** As a user, I want the application to work on different screen sizes, so that I can access it from desktop or tablet devices.

#### Acceptance Criteria

1. THE System SHALL use CSS Flexbox for flexible component layouts
2. THE System SHALL use CSS Grid for structured page layouts
3. WHEN viewed on desktop, THE System SHALL display content optimized for large screens
4. WHEN viewed on tablet, THE System SHALL adjust layout to fit medium-sized screens
5. THE System SHALL maintain readability and usability across supported screen sizes

### Requirement 8: Apply Academic Design Aesthetic

**User Story:** As a university stakeholder, I want the application to have a professional academic appearance, so that it reflects the institution's standards.

#### Acceptance Criteria

1. THE System SHALL use Dark Blue (#0B3C5D) as the primary color
2. THE System SHALL use Light Blue (#328CC1) as the accent color
3. THE System SHALL use White or Light Grey for background colors
4. THE System SHALL use Times New Roman or Roboto font family
5. WHEN users interact with elements, THE System SHALL provide hover effects as the only animation
6. THE System SHALL maintain a clean, minimal, and professional visual style throughout

### Requirement 9: Structure Code for Maintainability

**User Story:** As a developer, I want the codebase to be well-organized and documented, so that I can easily understand and maintain it.

#### Acceptance Criteria

1. THE System SHALL organize JavaScript into modular files including api.js, dashboard.js, and authors.js
2. THE System SHALL include clear comments explaining code functionality
3. THE System SHALL use semantic HTML5 tags for improved code readability
4. THE System SHALL separate concerns between HTML structure, CSS styling, and JavaScript behavior
5. THE System SHALL follow consistent naming conventions across all files

### Requirement 10: Implement Backend API Integration

**User Story:** As a developer, I want placeholder API calls ready for backend integration, so that I can easily connect to a real backend later.

#### Acceptance Criteria

1. THE System SHALL use JavaScript fetch() API for all data operations
2. WHEN making API calls, THE System SHALL use placeholder endpoints that can be replaced with real URLs
3. THE System SHALL handle API responses asynchronously using promises or async/await
4. THE System SHALL structure API calls in a dedicated api.js module
5. THE System SHALL include error handling for failed API requests

### Requirement 11: Ensure Performance and Load Speed

**User Story:** As a user, I want the application to load quickly, so that I can access information without delays.

#### Acceptance Criteria

1. THE System SHALL use only vanilla JavaScript without external frameworks
2. THE System SHALL minimize CSS file size by avoiding unnecessary styles
3. THE System SHALL load all resources efficiently without blocking page rendering
4. THE System SHALL avoid heavy animations or transitions that impact performance
5. THE System SHALL be lightweight and fast-loading on standard internet connections
