/**
 * Analytics Module for CHARUSAT Research Analyzer
 * 
 * This module handles the functionality for the analytics page.
 * It loads and displays charts for research analytics data.
 */

/**
 * Initialize analytics page when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeAnalyticsPage();
});

/**
 * Initialize all analytics page functionality
 */
async function initializeAnalyticsPage() {
    try {
        await loadAnalytics();
    } catch (error) {
        console.error('Error initializing analytics page:', error);
    }
}

/**
 * Load and display analytics data
 */
async function loadAnalytics() {
    try {
        const data = await fetchAnalyticsData();
        
        renderPublicationsChart(data.publicationsByYear);
        renderDomainsChart(data.topDomains);
        renderDepartmentsChart(data.departmentCounts);
    } catch (error) {
        console.error('Error loading analytics:', error);
    }
}

/**
 * Render publications by year chart
 * 
 * Creates a vertical bar chart showing the number of publications per year.
 * Uses the HTML5 Canvas API to draw bars, labels, and axes.
 * 
 * @param {Array} data - Array of {year, count} objects
 */
function renderPublicationsChart(data) {
    const canvas = document.getElementById('publications-chart');
    
    if (!canvas) {
        console.warn('Publications chart canvas not found');
        return;
    }
    
    if (!data || data.length === 0) {
        console.warn('No publications data to display');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.warn('Could not get canvas context');
        return;
    }
    
    // Set canvas dimensions for optimal display
    canvas.width = 800;
    canvas.height = 400;
    
    // Chart configuration - calculate dimensions and spacing
    const padding = 60; // Space for labels and axes
    const chartWidth = canvas.width - 2 * padding; // Available width for bars
    const chartHeight = canvas.height - 2 * padding; // Available height for bars
    const barWidth = chartWidth / data.length; // Width of each bar
    const maxCount = Math.max(...data.map(d => d.count)); // Maximum value for scaling
    
    // Clear canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw bars for each year
    data.forEach((item, index) => {
        // Calculate bar height proportional to the count value
        const barHeight = (item.count / maxCount) * chartHeight;
        
        // Calculate bar position (x, y coordinates)
        const x = padding + index * barWidth; // Horizontal position
        const y = canvas.height - padding - barHeight; // Vertical position (from bottom)
        
        // Draw the bar with light blue color
        ctx.fillStyle = '#328CC1'; // Light blue accent color
        ctx.fillRect(x + 10, y, barWidth - 20, barHeight); // Add margins (10px) between bars
        
        // Draw count label on top of bar
        ctx.fillStyle = '#0B3C5D'; // Dark blue
        ctx.font = '14px Roboto';
        ctx.textAlign = 'center';
        ctx.fillText(item.count.toString(), x + barWidth / 2, y - 5);
        
        // Draw year label below bar
        ctx.fillStyle = '#0B3C5D';
        ctx.font = '12px Roboto';
        ctx.fillText(item.year.toString(), x + barWidth / 2, canvas.height - padding + 20);
    });
    
    // Draw chart axes (Y-axis and X-axis)
    ctx.strokeStyle = '#0B3C5D';
    ctx.lineWidth = 2;
    ctx.beginPath();
    // Y-axis (vertical line on the left)
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    // X-axis (horizontal line at the bottom)
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();
    
    // Draw axis labels
    ctx.fillStyle = '#0B3C5D';
    ctx.font = '14px Roboto';
    ctx.textAlign = 'center';
    // X-axis label
    ctx.fillText('Year', canvas.width / 2, canvas.height - 10);
    
    // Y-axis label (rotated 90 degrees)
    ctx.save(); // Save current canvas state
    ctx.translate(15, canvas.height / 2); // Move to label position
    ctx.rotate(-Math.PI / 2); // Rotate 90 degrees counter-clockwise
    ctx.fillText('Number of Publications', 0, 0);
    ctx.restore(); // Restore canvas state
}

/**
 * Render top research domains chart
 * 
 * Creates a horizontal bar chart showing the top research domains by paper count.
 * Uses the HTML5 Canvas API to draw horizontal bars with domain labels.
 * 
 * @param {Array} data - Array of {domain, count} objects
 */
function renderDomainsChart(data) {
    const canvas = document.getElementById('domains-chart');
    
    if (!canvas) {
        console.warn('Domains chart canvas not found');
        return;
    }
    
    if (!data || data.length === 0) {
        console.warn('No domains data to display');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.warn('Could not get canvas context');
        return;
    }
    
    // Set canvas dimensions for optimal display
    canvas.width = 800;
    canvas.height = 400;
    
    // Chart configuration - calculate dimensions and spacing
    const padding = 60; // Space for labels and axes
    const chartWidth = canvas.width - 2 * padding; // Available width for bars
    const chartHeight = canvas.height - 2 * padding; // Available height for bars
    const barHeight = chartHeight / data.length; // Height of each bar
    const maxCount = Math.max(...data.map(d => d.count)); // Maximum value for scaling
    
    // Clear canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw horizontal bars for each domain
    data.forEach((item, index) => {
        // Calculate bar width proportional to the count value
        const barWidth = (item.count / maxCount) * chartWidth;
        
        // Calculate bar position (x, y coordinates)
        const x = padding; // Start from left padding
        const y = padding + index * barHeight; // Vertical position for this bar
        
        // Draw the horizontal bar with light blue color
        ctx.fillStyle = '#328CC1'; // Light blue accent color
        ctx.fillRect(x, y + 10, barWidth, barHeight - 20); // Add margins (10px) between bars
        
        // Draw count label at the end of the bar
        ctx.fillStyle = '#0B3C5D'; // Dark blue
        ctx.font = '14px Roboto';
        ctx.textAlign = 'left';
        ctx.fillText(item.count.toString(), x + barWidth + 5, y + barHeight / 2 + 5);
        
        // Draw domain label to the left of the bar
        ctx.fillStyle = '#0B3C5D';
        ctx.font = '12px Roboto';
        ctx.textAlign = 'right';
        // Truncate long domain names to prevent overflow
        const domainText = item.domain.length > 25 ? item.domain.substring(0, 22) + '...' : item.domain;
        ctx.fillText(domainText, x - 10, y + barHeight / 2 + 5);
    });
    
    // Draw chart axes (Y-axis and X-axis)
    ctx.strokeStyle = '#0B3C5D';
    ctx.lineWidth = 2;
    ctx.beginPath();
    // Y-axis (vertical line on the left)
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    // X-axis (horizontal line at the bottom)
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();
    
    // Draw X-axis label
    ctx.fillStyle = '#0B3C5D';
    ctx.font = '14px Roboto';
    ctx.textAlign = 'center';
    ctx.fillText('Number of Papers', canvas.width / 2, canvas.height - 10);
}

/**
 * Render department-wise paper count chart
 * 
 * Creates a vertical bar chart showing the number of papers per department.
 * Uses the HTML5 Canvas API with rotated labels for better readability.
 * 
 * @param {Array} data - Array of {department, count} objects
 */
function renderDepartmentsChart(data) {
    const canvas = document.getElementById('departments-chart');
    
    if (!canvas) {
        console.warn('Departments chart canvas not found');
        return;
    }
    
    if (!data || data.length === 0) {
        console.warn('No departments data to display');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.warn('Could not get canvas context');
        return;
    }
    
    // Set canvas dimensions for optimal display
    canvas.width = 800;
    canvas.height = 400;
    
    // Chart configuration - calculate dimensions and spacing
    const padding = 60; // Space for labels and axes
    const chartWidth = canvas.width - 2 * padding; // Available width for bars
    const chartHeight = canvas.height - 2 * padding; // Available height for bars
    const barWidth = chartWidth / data.length; // Width of each bar
    const maxCount = Math.max(...data.map(d => d.count)); // Maximum value for scaling
    
    // Clear canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw bars for each department
    data.forEach((item, index) => {
        // Calculate bar height proportional to the count value
        const barHeight = (item.count / maxCount) * chartHeight;
        
        // Calculate bar position (x, y coordinates)
        const x = padding + index * barWidth; // Horizontal position
        const y = canvas.height - padding - barHeight; // Vertical position (from bottom)
        
        // Draw the bar with light blue color
        ctx.fillStyle = '#328CC1'; // Light blue accent color
        ctx.fillRect(x + 10, y, barWidth - 20, barHeight); // Add margins (10px) between bars
        
        // Draw count label on top of bar
        ctx.fillStyle = '#0B3C5D'; // Dark blue
        ctx.font = '14px Roboto';
        ctx.textAlign = 'center';
        ctx.fillText(item.count.toString(), x + barWidth / 2, y - 5);
        
        // Draw department label below bar with 45-degree rotation for readability
        ctx.save(); // Save current canvas state
        ctx.translate(x + barWidth / 2, canvas.height - padding + 15); // Move to label position
        ctx.rotate(-Math.PI / 4); // Rotate 45 degrees counter-clockwise
        ctx.fillStyle = '#0B3C5D';
        ctx.font = '11px Roboto';
        ctx.textAlign = 'right';
        // Truncate long department names to prevent overlap
        const deptText = item.department.length > 20 ? item.department.substring(0, 17) + '...' : item.department;
        ctx.fillText(deptText, 0, 0);
        ctx.restore(); // Restore canvas state
    });
    
    // Draw chart axes (Y-axis and X-axis)
    ctx.strokeStyle = '#0B3C5D';
    ctx.lineWidth = 2;
    ctx.beginPath();
    // Y-axis (vertical line on the left)
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    // X-axis (horizontal line at the bottom)
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();
    
    // Draw axis labels
    ctx.fillStyle = '#0B3C5D';
    ctx.font = '14px Roboto';
    ctx.textAlign = 'center';
    // X-axis label
    ctx.fillText('Department', canvas.width / 2, canvas.height - 10);
    
    // Y-axis label (rotated 90 degrees)
    ctx.save(); // Save current canvas state
    ctx.translate(15, canvas.height / 2); // Move to label position
    ctx.rotate(-Math.PI / 2); // Rotate 90 degrees counter-clockwise
    ctx.fillText('Number of Papers', 0, 0);
    ctx.restore(); // Restore canvas state
}
