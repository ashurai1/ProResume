/**
 * Template Rendering Logic
 */

const Templates = {
    tech: (data) => {
        return `
            <div class="resume-template tech">
                <header class="resume-header">
                    <h1>${data.fullName || 'Your Name'}</h1>
                    <div class="contact-info">
                        ${data.email ? `<span>${data.email}</span>` : ''}
                        ${data.phone ? `<span> • ${data.phone}</span>` : ''}
                        ${data.address ? `<span> • ${data.address}</span>` : ''}
                    </div>
                    <div class="links">
                        ${data.links ? `<span>${data.links}</span>` : ''}
                    </div>
                </header>

                ${data.summary ? `
                <section class="resume-section">
                    <h3>Professional Summary</h3>
                    <hr>
                    <p>${data.summary}</p>
                </section>` : ''}

                <div class="two-column">
                    <div class="left-col">
                        ${data.skills && (data.technicalSkills || data.softSkills) ? `
                        <section class="resume-section">
                            <h3>Skills</h3>
                            <hr>
                            ${data.technicalSkills ? `
                            <div class="skill-group">
                                <strong>Technical:</strong>
                                <p>${data.technicalSkills}</p>
                            </div>` : ''}
                            ${data.softSkills ? `
                            <div class="skill-group">
                                <strong>Soft Skills:</strong>
                                <p>${data.softSkills}</p>
                            </div>` : ''}
                        </section>` : ''}

                        ${data.education && data.education.length > 0 ? `
                        <section class="resume-section">
                            <h3>Education</h3>
                            <hr>
                            ${data.education.map(edu => `
                                <div class="resume-item">
                                    <h4>${edu.school}</h4>
                                    <p class="sub-title">${edu.degree}</p>
                                    <p class="date">${formatDate(edu.startDate)} - ${edu.current ? 'Present' : formatDate(edu.endDate)}</p>
                                    ${edu.description ? `<p>${edu.description}</p>` : ''}
                                </div>
                            `).join('')}
                        </section>` : ''}
                        
                         ${data.certifications && data.certifications.length > 0 ? `
                        <section class="resume-section">
                            <h3>Certifications</h3>
                            <hr>
                            ${data.certifications.map(cert => `
                                <div class="resume-item">
                                    <h4>${cert.name}</h4>
                                    <p class="sub-title">${cert.issuer}</p>
                                    <p class="date">${formatDate(cert.date)}</p>
                                </div>
                            `).join('')}
                        </section>` : ''}
                    </div>

                    <div class="right-col">
                        ${data.experience && data.experience.length > 0 ? `
                        <section class="resume-section">
                            <h3>Experience</h3>
                            <hr>
                            ${data.experience.map(exp => `
                                <div class="resume-item">
                                    <div class="item-header">
                                        <h4>${exp.position}</h4>
                                        <span class="date">${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}</span>
                                    </div>
                                    <p class="sub-title">${exp.company}</p>
                                    <p>${exp.description}</p>
                                </div>
                            `).join('')}
                        </section>` : ''}

                        ${data.projects && data.projects.length > 0 ? `
                        <section class="resume-section">
                            <h3>Projects</h3>
                            <hr>
                            ${data.projects.map(proj => `
                                <div class="resume-item">
                                    <div class="item-header">
                                        <h4>${proj.name}</h4>
                                        ${proj.link ? `<a href="${proj.link}" target="_blank">${proj.link}</a>` : ''}
                                    </div>
                                    <p>${proj.description}</p>
                                </div>
                            `).join('')}
                        </section>` : ''}
                    </div>
                </div>
                
                 ${data.customSections && data.customSections.length > 0 ? data.customSections.map(section => `
                    <section class="resume-section">
                        <h3>${section.title}</h3>
                        <hr>
                        ${section.items.map(item => `
                            <div class="resume-item">
                                <h4>${item.title}</h4>
                                <p class="sub-title">${item.subtitle}</p>
                                <p class="date">${item.date}</p>
                                <p>${item.description}</p>
                            </div>
                        `).join('')}
                    </section>
                `).join('') : ''}
            </div>
            <style>
                .tech .resume-header { text-align: center; margin-bottom: 20px; }
                .tech h1 { font-size: 24px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px; }
                .tech .contact-info, .tech .links { font-size: 12px; color: #555; }
                .tech h3 { font-size: 16px; text-transform: uppercase; border-bottom: 2px solid #333; padding-bottom: 3px; margin-bottom: 10px; margin-top: 15px; }
                .tech hr { display: none; }
                .tech .two-column { display: flex; gap: 20px; }
                .tech .left-col { width: 35%; }
                .tech .right-col { width: 65%; }
                .tech .resume-item { margin-bottom: 10px; }
                .tech h4 { font-size: 14px; font-weight: bold; margin-bottom: 2px; }
                .tech .sub-title { font-weight: bold; font-size: 12px; color: #444; margin-bottom: 2px; }
                .tech .date { font-size: 11px; color: #666; font-style: italic; margin-bottom: 2px; }
                .tech p { font-size: 12px; line-height: 1.4; }
                .tech .skill-group { margin-bottom: 8px; }
                .tech .item-header { display: flex; justify-content: space-between; align-items: baseline; }
            </style>
        `;
    },

    modern: (data) => {
        return `
            <div class="resume-template modern">
                <header class="resume-header">
                    <h1>${data.fullName || 'Your Name'}</h1>
                    <div class="contact-info">
                        ${data.email ? `<span>${data.email}</span>` : ''}
                        ${data.phone ? `<span>${data.phone}</span>` : ''}
                        ${data.address ? `<span>${data.address}</span>` : ''}
                    </div>
                     <div class="links">
                        ${data.links ? `<span>${data.links}</span>` : ''}
                    </div>
                </header>

                ${data.summary ? `
                <section class="resume-section">
                    <p class="summary">${data.summary}</p>
                </section>` : ''}

                ${data.experience && data.experience.length > 0 ? `
                <section class="resume-section">
                    <h3>Experience</h3>
                    ${data.experience.map(exp => `
                        <div class="resume-item">
                            <div class="item-header">
                                <h4>${exp.position}</h4>
                                <span class="date">${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}</span>
                            </div>
                            <p class="company">${exp.company}</p>
                            <p>${exp.description}</p>
                        </div>
                    `).join('')}
                </section>` : ''}

                ${data.projects && data.projects.length > 0 ? `
                <section class="resume-section">
                    <h3>Projects</h3>
                    ${data.projects.map(proj => `
                        <div class="resume-item">
                            <div class="item-header">
                                <h4>${proj.name}</h4>
                                ${proj.link ? `<a href="${proj.link}" target="_blank">${proj.link}</a>` : ''}
                            </div>
                            <p>${proj.description}</p>
                        </div>
                    `).join('')}
                </section>` : ''}

                ${data.education && data.education.length > 0 ? `
                <section class="resume-section">
                    <h3>Education</h3>
                    ${data.education.map(edu => `
                        <div class="resume-item">
                            <div class="item-header">
                                <h4>${edu.school}</h4>
                                <span class="date">${formatDate(edu.startDate)} - ${edu.current ? 'Present' : formatDate(edu.endDate)}</span>
                            </div>
                            <p class="degree">${edu.degree}</p>
                            ${edu.description ? `<p>${edu.description}</p>` : ''}
                        </div>
                    `).join('')}
                </section>` : ''}

                ${data.skills && (data.technicalSkills || data.softSkills) ? `
                <section class="resume-section">
                    <h3>Skills</h3>
                    <div class="skills-grid">
                        ${data.technicalSkills ? `
                        <div>
                            <strong>Technical</strong>
                            <p>${data.technicalSkills}</p>
                        </div>` : ''}
                        ${data.softSkills ? `
                        <div>
                            <strong>Soft Skills</strong>
                            <p>${data.softSkills}</p>
                        </div>` : ''}
                    </div>
                </section>` : ''}
                
                ${data.certifications && data.certifications.length > 0 ? `
                <section class="resume-section">
                    <h3>Certifications</h3>
                    ${data.certifications.map(cert => `
                        <div class="resume-item">
                            <div class="item-header">
                                <h4>${cert.name}</h4>
                                <span class="date">${formatDate(cert.date)}</span>
                            </div>
                            <p class="company">${cert.issuer}</p>
                        </div>
                    `).join('')}
                </section>` : ''}
                
                 ${data.customSections && data.customSections.length > 0 ? data.customSections.map(section => `
                    <section class="resume-section">
                        <h3>${section.title}</h3>
                        ${section.items.map(item => `
                            <div class="resume-item">
                                <div class="item-header">
                                    <h4>${item.title}</h4>
                                    <span class="date">${item.date}</span>
                                </div>
                                <p class="company">${item.subtitle}</p>
                                <p>${item.description}</p>
                            </div>
                        `).join('')}
                    </section>
                `).join('') : ''}
            </div>
            <style>
                .modern { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; }
                .modern .resume-header { border-bottom: 1px solid #eee; padding-bottom: 20px; margin-bottom: 20px; }
                .modern h1 { font-size: 32px; font-weight: 300; margin-bottom: 10px; color: #2c3e50; }
                .modern .contact-info { display: flex; gap: 15px; font-size: 13px; color: #7f8c8d; }
                .modern .links { font-size: 13px; color: #7f8c8d; margin-top: 5px; }
                .modern h3 { font-size: 14px; text-transform: uppercase; color: #95a5a6; margin-bottom: 15px; letter-spacing: 1px; font-weight: 600; }
                .modern .resume-section { margin-bottom: 25px; }
                .modern .resume-item { margin-bottom: 15px; }
                .modern .item-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px; }
                .modern h4 { font-size: 16px; font-weight: 600; color: #2c3e50; }
                .modern .date { font-size: 12px; color: #95a5a6; }
                .modern .company, .modern .degree { font-size: 14px; font-weight: 500; color: #34495e; margin-bottom: 5px; }
                .modern p { font-size: 13px; line-height: 1.6; color: #555; }
                .modern .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
            </style>
        `;
    },

    minimal: (data) => {
        return `
            <div class="resume-template minimal">
                <header class="resume-header">
                    <h1>${data.fullName || 'Your Name'}</h1>
                    <div class="contact-info">
                        ${data.email ? `<span>${data.email}</span>` : ''}
                        ${data.phone ? `<span>${data.phone}</span>` : ''}
                        ${data.address ? `<span>${data.address}</span>` : ''}
                    </div>
                     <div class="links">
                        ${data.links ? `<span>${data.links}</span>` : ''}
                    </div>
                </header>

                ${data.summary ? `
                <section class="resume-section">
                    <p>${data.summary}</p>
                </section>` : ''}

                ${data.experience && data.experience.length > 0 ? `
                <section class="resume-section">
                    <h3>Experience</h3>
                    ${data.experience.map(exp => `
                        <div class="resume-item">
                            <div class="left">
                                <span class="date">${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}</span>
                            </div>
                            <div class="right">
                                <h4>${exp.position}</h4>
                                <p class="company">${exp.company}</p>
                                <p>${exp.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </section>` : ''}

                ${data.projects && data.projects.length > 0 ? `
                <section class="resume-section">
                    <h3>Projects</h3>
                    ${data.projects.map(proj => `
                        <div class="resume-item">
                            <div class="left"></div>
                            <div class="right">
                                <h4>${proj.name}</h4>
                                ${proj.link ? `<a href="${proj.link}" target="_blank">${proj.link}</a>` : ''}
                                <p>${proj.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </section>` : ''}

                ${data.education && data.education.length > 0 ? `
                <section class="resume-section">
                    <h3>Education</h3>
                    ${data.education.map(edu => `
                        <div class="resume-item">
                            <div class="left">
                                <span class="date">${formatDate(edu.startDate)} - ${edu.current ? 'Present' : formatDate(edu.endDate)}</span>
                            </div>
                            <div class="right">
                                <h4>${edu.school}</h4>
                                <p class="degree">${edu.degree}</p>
                                ${edu.description ? `<p>${edu.description}</p>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </section>` : ''}

                ${data.skills && (data.technicalSkills || data.softSkills) ? `
                <section class="resume-section">
                    <h3>Skills</h3>
                    <div class="resume-item">
                        <div class="left"></div>
                        <div class="right">
                            ${data.technicalSkills ? `<p><strong>Technical:</strong> ${data.technicalSkills}</p>` : ''}
                            ${data.softSkills ? `<p><strong>Soft Skills:</strong> ${data.softSkills}</p>` : ''}
                        </div>
                    </div>
                </section>` : ''}
                
                ${data.certifications && data.certifications.length > 0 ? `
                <section class="resume-section">
                    <h3>Certifications</h3>
                    ${data.certifications.map(cert => `
                        <div class="resume-item">
                            <div class="left">
                                <span class="date">${formatDate(cert.date)}</span>
                            </div>
                            <div class="right">
                                <h4>${cert.name}</h4>
                                <p class="company">${cert.issuer}</p>
                            </div>
                        </div>
                    `).join('')}
                </section>` : ''}
                
                 ${data.customSections && data.customSections.length > 0 ? data.customSections.map(section => `
                    <section class="resume-section">
                        <h3>${section.title}</h3>
                        ${section.items.map(item => `
                            <div class="resume-item">
                                <div class="left">
                                    <span class="date">${item.date}</span>
                                </div>
                                <div class="right">
                                    <h4>${item.title}</h4>
                                    <p class="company">${item.subtitle}</p>
                                    <p>${item.description}</p>
                                </div>
                            </div>
                        `).join('')}
                    </section>
                `).join('') : ''}
            </div>
            <style>
                .minimal { font-family: 'Georgia', serif; color: #111; }
                .minimal .resume-header { margin-bottom: 30px; }
                .minimal h1 { font-size: 28px; font-weight: normal; margin-bottom: 5px; }
                .minimal .contact-info { font-family: 'Arial', sans-serif; font-size: 12px; color: #666; }
                .minimal .links { font-family: 'Arial', sans-serif; font-size: 12px; color: #666; }
                .minimal h3 { font-family: 'Arial', sans-serif; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px; color: #333; }
                .minimal .resume-section { margin-bottom: 30px; }
                .minimal .resume-item { display: flex; margin-bottom: 15px; }
                .minimal .left { width: 120px; flex-shrink: 0; padding-right: 20px; }
                .minimal .right { flex: 1; }
                .minimal .date { font-family: 'Arial', sans-serif; font-size: 11px; color: #888; }
                .minimal h4 { font-size: 16px; font-weight: bold; margin-bottom: 3px; }
                .minimal .company, .minimal .degree { font-style: italic; font-size: 14px; margin-bottom: 5px; color: #444; }
                .minimal p { font-size: 14px; line-height: 1.5; color: #222; }
            </style>
        `;
    }
};
