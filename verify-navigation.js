/**
 * Automated Navigation Verification Script
 * Task 11.1: Test navigation between all pages
 * 
 * This script verifies:
 * 1. All navigation links are present on each page
 * 2. Active page is correctly highlighted
 * 3. Navigation structure is consistent across all pages
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    bold: '\x1b[1m'
};

// Test results tracking
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

// Helper function to log test results
function logTest(testName, passed, details = '') {
    totalTests++;
    if (passed) {
        passedTests++;
        console.log(`${colors.green}✓${colors.reset} ${testName}`);
    } else {
        failedTests++;
        console.log(`${colors.red}✗${colors.reset} ${testName}`);
        if (details) {
            console.log(`  ${colors.yellow}→ ${details}${colors.reset}`);
        }
        failures.push({ test: testName, details });
    }
}

// Helper function to extract navigation from HTML
function extractNavigation(html, filename) {
    const navMatch = html.match(/<nav[^>]*class="main-nav"[^>]*>([\s\S]*?)<\/nav>/);
    if (!navMatch) {
        return null;
    }
    
    const navContent = navMatch[1];
    
    // Extract logo
    const logoMatch = navContent.match(/<div[^>]*class="logo"[^>]*>(.*?)<\/div>/);
    const logo = logoMatch ? logoMatch[1].trim() : null;
    
    // Extract all links - handle class attribute before or after href
    const linkMatches = [...navContent.matchAll(/<a[^>]*>(.*?)<\/a>/g)];
    const links = [];
    
    linkMatches.forEach(match => {
        const fullTag = match[0];
        const text = match[1].trim();
        
        const hrefMatch = fullTag.match(/href="([^"]*)"/);
        const classMatch = fullTag.match(/class="([^"]*)"/);
        
        if (hrefMatch) {
            links.push({
                href: hrefMatch[1],
                classes: classMatch ? classMatch[1] : '',
                text: text,
                isActive: classMatch ? classMatch[1].includes('active') : false
            });
        }
    });
    
    return { logo, links, navContent };
}

// Pages to test
const pages = [
    { file: 'index.html', name: 'Home', expectedActive: 'index.html' },
    { file: 'papers.html', name: 'Papers', expectedActive: 'papers.html' },
    { file: 'authors.html', name: 'Authors', expectedActive: 'authors.html' },
    { file: 'analytics.html', name: 'Analytics', expectedActive: 'analytics.html' },
    { file: 'about.html', name: 'About', expectedActive: 'about.html' }
];

// Expected navigation structure
const expectedLinks = [
    { href: 'index.html', text: 'Home' },
    { href: 'papers.html', text: 'Papers' },
    { href: 'authors.html', text: 'Authors' },
    { href: 'analytics.html', text: 'Analytics' },
    { href: 'about.html', text: 'About' }
];

console.log(`\n${colors.bold}${colors.cyan}========================================${colors.reset}`);
console.log(`${colors.bold}${colors.cyan}Navigation Verification - Task 11.1${colors.reset}`);
console.log(`${colors.bold}${colors.cyan}========================================${colors.reset}\n`);

// Test 1: Verify all HTML files exist
console.log(`${colors.bold}Test Suite 1: File Existence${colors.reset}`);
pages.forEach(page => {
    const exists = fs.existsSync(page.file);
    logTest(`${page.file} exists`, exists, exists ? '' : 'File not found');
});

console.log('');

// Read all HTML files
const htmlContents = {};
pages.forEach(page => {
    if (fs.existsSync(page.file)) {
        htmlContents[page.file] = fs.readFileSync(page.file, 'utf8');
    }
});

// Test 2: Verify navigation bar presence
console.log(`${colors.bold}Test Suite 2: Navigation Bar Presence${colors.reset}`);
pages.forEach(page => {
    if (htmlContents[page.file]) {
        const hasNav = htmlContents[page.file].includes('<nav class="main-nav">');
        logTest(`${page.file} has navigation bar`, hasNav, hasNav ? '' : 'Navigation bar not found');
    }
});

console.log('');

// Test 3: Verify logo presence and consistency
console.log(`${colors.bold}Test Suite 3: Logo Consistency${colors.reset}`);
const expectedLogo = 'CHARUSAT Research Analyzer';
pages.forEach(page => {
    if (htmlContents[page.file]) {
        const nav = extractNavigation(htmlContents[page.file], page.file);
        if (nav) {
            const logoCorrect = nav.logo === expectedLogo;
            logTest(`${page.file} has correct logo`, logoCorrect, 
                logoCorrect ? '' : `Expected "${expectedLogo}", got "${nav.logo}"`);
        }
    }
});

console.log('');

// Test 4: Verify all navigation links are present
console.log(`${colors.bold}Test Suite 4: Navigation Links Presence${colors.reset}`);
pages.forEach(page => {
    if (htmlContents[page.file]) {
        const nav = extractNavigation(htmlContents[page.file], page.file);
        if (nav) {
            const hasAllLinks = expectedLinks.every(expected => 
                nav.links.some(link => link.href === expected.href && link.text === expected.text)
            );
            logTest(`${page.file} has all 5 navigation links`, hasAllLinks,
                hasAllLinks ? '' : 'Missing one or more navigation links');
        }
    }
});

console.log('');

// Test 5: Verify navigation links are in correct order
console.log(`${colors.bold}Test Suite 5: Navigation Links Order${colors.reset}`);
pages.forEach(page => {
    if (htmlContents[page.file]) {
        const nav = extractNavigation(htmlContents[page.file], page.file);
        if (nav) {
            const orderCorrect = expectedLinks.every((expected, index) => {
                const link = nav.links[index];
                return link && link.href === expected.href && link.text === expected.text;
            });
            logTest(`${page.file} has links in correct order`, orderCorrect,
                orderCorrect ? '' : 'Navigation links are not in the expected order');
        }
    }
});

console.log('');

// Test 6: Verify active page highlighting
console.log(`${colors.bold}Test Suite 6: Active Page Highlighting${colors.reset}`);
pages.forEach(page => {
    if (htmlContents[page.file]) {
        const nav = extractNavigation(htmlContents[page.file], page.file);
        if (nav) {
            // Find the link that should be active
            const activeLink = nav.links.find(link => link.href === page.expectedActive);
            const isActiveCorrect = activeLink && activeLink.isActive;
            
            // Check that only one link is active
            const activeCount = nav.links.filter(link => link.isActive).length;
            const onlyOneActive = activeCount === 1;
            
            logTest(`${page.file} has correct active link (${page.name})`, 
                isActiveCorrect && onlyOneActive,
                !isActiveCorrect ? `${page.name} link should have "active" class` :
                !onlyOneActive ? `Found ${activeCount} active links, expected 1` : '');
        }
    }
});

console.log('');

// Test 7: Verify navigation structure consistency
console.log(`${colors.bold}Test Suite 7: Navigation Structure Consistency${colors.reset}`);
// Check that all pages have the same navigation elements (ignoring active state)
const navElements = pages.map(page => {
    if (htmlContents[page.file]) {
        const nav = extractNavigation(htmlContents[page.file], page.file);
        if (nav) {
            // Create a signature of the navigation structure
            return {
                hasLogo: !!nav.logo,
                linkCount: nav.links.length,
                linkHrefs: nav.links.map(l => l.href).join(','),
                linkTexts: nav.links.map(l => l.text).join(',')
            };
        }
    }
    return null;
}).filter(Boolean);

if (navElements.length > 1) {
    const first = navElements[0];
    const allConsistent = navElements.every(elem => 
        elem.hasLogo === first.hasLogo &&
        elem.linkCount === first.linkCount &&
        elem.linkHrefs === first.linkHrefs &&
        elem.linkTexts === first.linkTexts
    );
    logTest('Navigation structure is consistent across all pages', allConsistent,
        allConsistent ? '' : 'Navigation elements differ between pages');
}

console.log('');

// Test 8: Verify CSS class usage
console.log(`${colors.bold}Test Suite 8: CSS Class Verification${colors.reset}`);
pages.forEach(page => {
    if (htmlContents[page.file]) {
        const nav = extractNavigation(htmlContents[page.file], page.file);
        if (nav) {
            // Check for nav-container class
            const hasNavContainer = nav.navContent.includes('class="nav-container"');
            logTest(`${page.file} uses nav-container class`, hasNavContainer);
            
            // Check for nav-links class
            const hasNavLinks = nav.navContent.includes('class="nav-links"');
            logTest(`${page.file} uses nav-links class`, hasNavLinks);
        }
    }
});

console.log('');

// Test 9: Verify semantic HTML
console.log(`${colors.bold}Test Suite 9: Semantic HTML${colors.reset}`);
pages.forEach(page => {
    if (htmlContents[page.file]) {
        const usesNav = htmlContents[page.file].includes('<nav');
        const usesMain = htmlContents[page.file].includes('<main');
        logTest(`${page.file} uses semantic <nav> tag`, usesNav);
        logTest(`${page.file} uses semantic <main> tag`, usesMain);
    }
});

console.log('');

// Test 10: Verify CSS file is linked
console.log(`${colors.bold}Test Suite 10: CSS Stylesheet Link${colors.reset}`);
pages.forEach(page => {
    if (htmlContents[page.file]) {
        const hasCssLink = htmlContents[page.file].includes('href="css/styles.css"');
        logTest(`${page.file} links to css/styles.css`, hasCssLink);
    }
});

console.log('');

// Print summary
console.log(`${colors.bold}${colors.cyan}========================================${colors.reset}`);
console.log(`${colors.bold}${colors.cyan}Test Summary${colors.reset}`);
console.log(`${colors.bold}${colors.cyan}========================================${colors.reset}\n`);

console.log(`Total Tests: ${totalTests}`);
console.log(`${colors.green}Passed: ${passedTests}${colors.reset}`);
console.log(`${colors.red}Failed: ${failedTests}${colors.reset}`);
console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%\n`);

if (failedTests > 0) {
    console.log(`${colors.bold}${colors.red}Failed Tests:${colors.reset}`);
    failures.forEach((failure, index) => {
        console.log(`${index + 1}. ${failure.test}`);
        if (failure.details) {
            console.log(`   ${colors.yellow}${failure.details}${colors.reset}`);
        }
    });
    console.log('');
    process.exit(1);
} else {
    console.log(`${colors.bold}${colors.green}✓ All navigation tests passed!${colors.reset}`);
    console.log(`${colors.green}Task 11.1 verification complete.${colors.reset}\n`);
    process.exit(0);
}
