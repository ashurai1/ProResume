/**
 * Main Application Logic
 */

// Initial State
const defaultState = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    links: '',
    summary: '',
    education: [],
    experience: [],
    projects: [],
    certifications: [],
    technicalSkills: '',
    softSkills: '',
    customSections: [],
    selectedTemplate: 'tech',
    theme: 'light'
};

let resumeData = loadFromStorage() || defaultState;

// DOM Elements
const form = document.getElementById('resume-form');
const previewContainer = document.getElementById('resume-preview');
const templateCards = document.querySelectorAll('.template-card');
const themeToggle = document.getElementById('theme-toggle');
const resetBtn = document.getElementById('reset-btn');
const downloadBtn = document.getElementById('download-btn');
const zoomLevelSpan = document.getElementById('zoom-level');

let currentZoom = 1;

// Initialize App
function init() {
    // Set initial theme
    document.documentElement.setAttribute('data-theme', resumeData.theme);
    updateThemeIcon(resumeData.theme);

    // Set initial template selection
    updateTemplateSelection(resumeData.selectedTemplate);

    // Populate Form with Data
    populateForm();

    // Render Initial Preview
    renderResume();

    // Event Listeners
    setupEventListeners();

    // Animations
    animateEntrance();
}

// Populate Form Fields
function populateForm() {
    // Static Fields
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        if (resumeData[input.name] !== undefined) {
            input.value = resumeData[input.name];
        }
    });

    // Dynamic Fields
    renderDynamicList('education-list', resumeData.education, createEducationItem);
    renderDynamicList('experience-list', resumeData.experience, createExperienceItem);
    renderDynamicList('projects-list', resumeData.projects, createProjectItem);
    renderDynamicList('certifications-list', resumeData.certifications, createCertificationItem);
    renderDynamicList('custom-sections-list', resumeData.customSections, createCustomSectionItem);
}

// Setup Event Listeners
function setupEventListeners() {
    // Form Input Changes (Debounced)
    form.addEventListener('input', debounce((e) => {
        if (e.target.matches('input, textarea')) {
            updateStateFromForm();
        }
    }, 300));

    // Template Selection
    templateCards.forEach(card => {
        card.addEventListener('click', () => {
            const template = card.dataset.template;
            resumeData.selectedTemplate = template;
            saveToStorage(resumeData);
            updateTemplateSelection(template);
            renderResume();
        });
    });

    // Theme Toggle
    themeToggle.addEventListener('click', () => {
        const newTheme = resumeData.theme === 'light' ? 'dark' : 'light';
        resumeData.theme = newTheme;
        document.documentElement.setAttribute('data-theme', newTheme);
        updateThemeIcon(newTheme);
        saveToStorage(resumeData);
    });

    // Reset Data
    resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
            clearStorage();
            resumeData = { ...defaultState };
            location.reload();
        }
    });

    // Download PDF
    downloadBtn.addEventListener('click', () => {
        generatePDF(resumeData.selectedTemplate);
    });

    // Download Word
    const downloadWordBtn = document.getElementById('download-word-btn');
    if (downloadWordBtn) {
        downloadWordBtn.addEventListener('click', () => {
            generateWord(resumeData.selectedTemplate);
        });
    }
}

// Update State from Form
function updateStateFromForm() {
    const formData = new FormData(form);

    // Update Static Fields
    for (let [key, value] of formData.entries()) {
        if (resumeData.hasOwnProperty(key) && !Array.isArray(resumeData[key])) {
            resumeData[key] = value;
        }
    }

    // Update Dynamic Fields (Complex logic handled by specific updaters or re-reading DOM)
    // For simplicity in this vanilla JS app, we'll update dynamic arrays by reading the DOM structure
    resumeData.education = getDynamicData('education-list', ['school', 'degree', 'startDate', 'endDate', 'description', 'current']);
    resumeData.experience = getDynamicData('experience-list', ['position', 'company', 'startDate', 'endDate', 'description', 'current']);
    resumeData.projects = getDynamicData('projects-list', ['name', 'link', 'description']);
    resumeData.certifications = getDynamicData('certifications-list', ['name', 'issuer', 'date']);
    resumeData.customSections = getCustomSectionsData();

    saveToStorage(resumeData);
    renderResume();
}

// Render Resume
function renderResume() {
    const templateFunc = Templates[resumeData.selectedTemplate];
    if (templateFunc) {
        previewContainer.innerHTML = templateFunc(resumeData);
        // Remove previous template classes
        previewContainer.classList.remove('tech', 'modern', 'minimal');
        // Add current template class
        previewContainer.classList.add(resumeData.selectedTemplate);
    }
}

// Helper: Update Template Selection UI
function updateTemplateSelection(selected) {
    templateCards.forEach(card => {
        if (card.dataset.template === selected) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
}

// Helper: Update Theme Icon
function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// --- Dynamic Field Logic ---

function createEducationItem(data = {}) {
    const id = generateId();
    return `
        <div class="dynamic-item" data-id="${id}">
            <button type="button" class="btn-remove" onclick="removeItem(this)"><i class="fa-solid fa-trash"></i></button>
            <div class="form-grid">
                <div class="form-group">
                    <label>School/University</label>
                    <input type="text" class="school" value="${data.school || ''}" placeholder="University Name">
                </div>
                <div class="form-group">
                    <label>Degree</label>
                    <input type="text" class="degree" value="${data.degree || ''}" placeholder="B.Sc. Computer Science">
                </div>
                <div class="form-group">
                    <label>Start Date</label>
                    <input type="month" class="startDate" value="${data.startDate || ''}">
                </div>
                <div class="form-group">
                    <label>End Date</label>
                    <input type="month" class="endDate" value="${data.endDate || ''}" ${data.current ? 'disabled' : ''}>
                    <label style="display:inline-flex; align-items:center; margin-top:5px; font-size:0.8rem;">
                        <input type="checkbox" class="current" ${data.current ? 'checked' : ''} onchange="toggleEndDate(this)"> Present
                    </label>
                </div>
                <div class="form-group full-width">
                    <label>Description</label>
                    <textarea class="description" rows="2" placeholder="Achievements, GPA, etc.">${data.description || ''}</textarea>
                </div>
            </div>
        </div>
    `;
}

function createExperienceItem(data = {}) {
    const id = generateId();
    return `
        <div class="dynamic-item" data-id="${id}">
            <button type="button" class="btn-remove" onclick="removeItem(this)"><i class="fa-solid fa-trash"></i></button>
            <div class="form-grid">
                <div class="form-group">
                    <label>Position Title</label>
                    <input type="text" class="position" value="${data.position || ''}" placeholder="Software Engineer">
                </div>
                <div class="form-group">
                    <label>Company</label>
                    <input type="text" class="company" value="${data.company || ''}" placeholder="Google">
                </div>
                <div class="form-group">
                    <label>Start Date</label>
                    <input type="month" class="startDate" value="${data.startDate || ''}">
                </div>
                <div class="form-group">
                    <label>End Date</label>
                    <input type="month" class="endDate" value="${data.endDate || ''}" ${data.current ? 'disabled' : ''}>
                    <label style="display:inline-flex; align-items:center; margin-top:5px; font-size:0.8rem;">
                        <input type="checkbox" class="current" ${data.current ? 'checked' : ''} onchange="toggleEndDate(this)"> Present
                    </label>
                </div>
                <div class="form-group full-width">
                    <label>Description</label>
                    <textarea class="description" rows="3" placeholder="Key responsibilities and achievements...">${data.description || ''}</textarea>
                </div>
            </div>
        </div>
    `;
}

function createProjectItem(data = {}) {
    const id = generateId();
    return `
        <div class="dynamic-item" data-id="${id}">
            <button type="button" class="btn-remove" onclick="removeItem(this)"><i class="fa-solid fa-trash"></i></button>
            <div class="form-grid">
                <div class="form-group">
                    <label>Project Name</label>
                    <input type="text" class="name" value="${data.name || ''}" placeholder="Project Title">
                </div>
                <div class="form-group">
                    <label>Link</label>
                    <input type="text" class="link" value="${data.link || ''}" placeholder="https://...">
                </div>
                <div class="form-group full-width">
                    <label>Description</label>
                    <textarea class="description" rows="2" placeholder="Tech stack used, features...">${data.description || ''}</textarea>
                </div>
            </div>
        </div>
    `;
}

function createCertificationItem(data = {}) {
    const id = generateId();
    return `
        <div class="dynamic-item" data-id="${id}">
            <button type="button" class="btn-remove" onclick="removeItem(this)"><i class="fa-solid fa-trash"></i></button>
            <div class="form-grid">
                <div class="form-group">
                    <label>Certification Name</label>
                    <input type="text" class="name" value="${data.name || ''}" placeholder="AWS Certified Solutions Architect">
                </div>
                <div class="form-group">
                    <label>Issuer</label>
                    <input type="text" class="issuer" value="${data.issuer || ''}" placeholder="Amazon Web Services">
                </div>
                <div class="form-group">
                    <label>Date</label>
                    <input type="month" class="date" value="${data.date || ''}">
                </div>
            </div>
        </div>
    `;
}

function createCustomSectionItem(data = {}) {
    const id = generateId();
    // For custom sections, we need a title for the section itself, and then items
    // But to keep it simple in this structure, we'll assume the user adds a "Custom Section" block which contains items
    // Actually, the requirement says "user can add/remove their own section titles and items"
    // So we need a way to define a section title.

    // Let's make this a "Custom Section Block" where they define the title, and then add items to it?
    // Or just a list of items where each item belongs to a "Custom Section"?
    // The simplest way given the UI structure is to allow adding a "Custom Section" which has a Title input and a list of items.
    // But my HTML structure has a single #custom-sections-list.
    // Let's adapt: Each item in this list is a whole section.

    let itemsHtml = '';
    if (data.items && data.items.length > 0) {
        itemsHtml = data.items.map(item => createCustomItemHtml(item)).join('');
    }

    return `
        <div class="dynamic-item custom-section-block" data-id="${id}">
            <button type="button" class="btn-remove" onclick="removeItem(this)"><i class="fa-solid fa-trash"></i></button>
            <div class="form-group">
                <label>Section Title</label>
                <input type="text" class="section-title" value="${data.title || ''}" placeholder="e.g. Volunteering, Publications">
            </div>
            <div class="custom-items-container">
                ${itemsHtml}
            </div>
            <button type="button" class="btn-add-sub" onclick="addCustomItemToSection(this)">+ Add Item</button>
        </div>
    `;
}

function createCustomItemHtml(data = {}) {
    return `
        <div class="custom-sub-item">
            <button type="button" class="btn-remove-sub" onclick="removeSubItem(this)">x</button>
            <input type="text" class="title" value="${data.title || ''}" placeholder="Title">
            <input type="text" class="subtitle" value="${data.subtitle || ''}" placeholder="Subtitle">
            <input type="text" class="date" value="${data.date || ''}" placeholder="Date">
            <textarea class="description" rows="1" placeholder="Description">${data.description || ''}</textarea>
        </div>
    `;
}

// Global functions for onclick handlers
window.addEducation = () => addDynamicItem('education-list', createEducationItem);
window.addExperience = () => addDynamicItem('experience-list', createExperienceItem);
window.addProject = () => addDynamicItem('projects-list', createProjectItem);
window.addCertification = () => addDynamicItem('certifications-list', createCertificationItem);
window.addCustomSection = () => addDynamicItem('custom-sections-list', createCustomSectionItem);

window.addCustomItemToSection = (btn) => {
    const container = btn.previousElementSibling;
    const div = document.createElement('div');
    div.innerHTML = createCustomItemHtml();
    // Unwrap
    while (div.firstChild) {
        container.appendChild(div.firstChild);
    }
    updateStateFromForm();
};

window.removeItem = (btn) => {
    btn.closest('.dynamic-item').remove();
    updateStateFromForm();
};

window.removeSubItem = (btn) => {
    btn.closest('.custom-sub-item').remove();
    updateStateFromForm();
};

window.toggleEndDate = (checkbox) => {
    const endDateInput = checkbox.closest('.form-group').querySelector('.endDate');
    if (checkbox.checked) {
        endDateInput.disabled = true;
        endDateInput.value = '';
    } else {
        endDateInput.disabled = false;
    }
    updateStateFromForm();
};

// Zoom Controls
window.zoomIn = () => {
    if (currentZoom < 1.5) {
        currentZoom += 0.1;
        applyZoom();
    }
};

window.zoomOut = () => {
    if (currentZoom > 0.5) {
        currentZoom -= 0.1;
        applyZoom();
    }
};

function applyZoom() {
    previewContainer.style.transform = `scale(${currentZoom})`;
    zoomLevelSpan.textContent = `${Math.round(currentZoom * 100)}%`;
}

// Helpers for Dynamic Lists
function addDynamicItem(listId, createFunc) {
    const list = document.getElementById(listId);
    const div = document.createElement('div');
    div.innerHTML = createFunc();
    // Unwrap the div to append the content directly if needed, but here createFunc returns a wrapper div
    // actually createFunc returns a string.
    // Let's just append the string as HTML
    list.insertAdjacentHTML('beforeend', createFunc());
    updateStateFromForm();
}

function renderDynamicList(listId, dataArray, createFunc) {
    const list = document.getElementById(listId);
    list.innerHTML = '';
    if (dataArray && dataArray.length > 0) {
        dataArray.forEach(item => {
            list.insertAdjacentHTML('beforeend', createFunc(item));
        });
    }
}

function getDynamicData(listId, fields) {
    const list = document.getElementById(listId);
    const items = list.querySelectorAll('.dynamic-item');
    return Array.from(items).map(item => {
        const data = {};
        fields.forEach(field => {
            const input = item.querySelector(`.${field}`);
            if (input) {
                if (input.type === 'checkbox') {
                    data[field] = input.checked;
                } else {
                    data[field] = input.value;
                }
            }
        });
        return data;
    });
}

function getCustomSectionsData() {
    const list = document.getElementById('custom-sections-list');
    const sections = list.querySelectorAll('.dynamic-item');
    return Array.from(sections).map(section => {
        const title = section.querySelector('.section-title').value;
        const subItems = section.querySelectorAll('.custom-sub-item');
        const items = Array.from(subItems).map(item => ({
            title: item.querySelector('.title').value,
            subtitle: item.querySelector('.subtitle').value,
            date: item.querySelector('.date').value,
            description: item.querySelector('.description').value
        }));
        return { title, items };
    });
}

// Animation
function animateEntrance() {
    gsap.from('.editor-panel', { duration: 0.8, x: -50, opacity: 0, ease: 'power3.out' });
    gsap.from('.preview-panel', { duration: 0.8, x: 50, opacity: 0, ease: 'power3.out', delay: 0.2 });
    gsap.from('.navbar', { duration: 0.8, y: -20, opacity: 0, ease: 'power3.out', delay: 0.4 });
}

// Run Init
document.addEventListener('DOMContentLoaded', init);
