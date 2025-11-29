/**
 * Utility Functions
 */

// Debounce function to limit the rate at which a function can fire.
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// LocalStorage Helpers
const STORAGE_KEY = 'pro_resume_data';

function saveToStorage(data) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.error('Error saving to localStorage', e);
    }
}

function loadFromStorage() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Error loading from localStorage', e);
        return null;
    }
}

function clearStorage() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
        console.error('Error clearing localStorage', e);
    }
}

// Generate unique ID
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

// Format Date (YYYY-MM to Month YYYY)
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString + '-01'); // Append day to make it parseable
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}
