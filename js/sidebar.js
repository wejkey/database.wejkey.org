const sidebarConfig = {
    brand: {
        logo: 'images/favicon.png',
        title: 'Wejkey Database'
    },
    sections: [
        {
            header: 'Homepage',
            links: [
                { text: 'Home', href: '/index.html' }
            ]
        },
        {
            id: 'section-valentines',
            header: 'Valentines',
            expandable: true,
            subitems: [
                { text: 'Overview', href: '/projects/valentines/index.html#overview' },
                { text: 'Gallery', href: '/projects/valentines/index.html#gallery' },
                { text: 'Changelog', href: '/projects/valentines/index.html#changelog' }
            ]
        },
        {
            id: 'section-calendar365',
            header: 'Calendar365',
            expandable: true,
            subitems: [
                { text: 'Overview', href: '/projects/calendar365/index.html#overview' },
                { text: 'Gallery', href: '/projects/calendar365/index.html#gallery' },
                { text: 'Changelog', href: '/projects/calendar365/index.html#changelog' }
            ]
        }
    ],
    footer: {
        text: '© 2025-2026 Wejkey. All rights reserved. (Version 2026+1.3)'
    }
};

function renderSidebar() {
    const sidebarElement = document.getElementById('sidebar');
    if (!sidebarElement) return;

    let sectionsHTML = '';

    sidebarConfig.sections.forEach(section => {
        if (section.expandable) {
            sectionsHTML += `
                <div class="nav-section" id="${section.id}">
                    <div class="nav-header" onclick="toggleSection(this)">
                        ${section.header}
                        <span class="nav-expand-icon">▶</span>
                    </div>
                    <div class="nav-subitems">
                        ${section.subitems.map(item =>
                            `<a href="${item.href}" class="nav-subitem">${item.text}</a>`
                        ).join('')}
                    </div>
                </div>
            `;
        } else {
            sectionsHTML += `
                <div class="nav-section">
                    <div class="nav-header">${section.header}</div>
                </div>
                ${section.links ? section.links.map(link =>
                    `<a href="${link.href}" class="nav-link">${link.text}</a>`
                ).join('') : ''}
            `;
        }
    });

    const isProjectPage = window.location.pathname.includes('/projects/');
    const logoPath = isProjectPage ? '../../' + sidebarConfig.brand.logo : sidebarConfig.brand.logo;

    sidebarElement.innerHTML = `
        <div class="sidebar-content">
            <div class="sidebar-brand">
                <div class="sidebar-logo"><img src="${logoPath}" alt="Logo"></div>
                <span class="sidebar-title">${sidebarConfig.brand.title}</span>
            </div>

            <nav class="sidebar-nav">
                ${sectionsHTML}
            </nav>
        </div>
        <div class="sidebar-footer">
            <p>${sidebarConfig.footer.text}</p>
        </div>
    `;

    updateActiveNavLinks();
    restoreExpandedSections();
}

document.addEventListener('DOMContentLoaded', renderSidebar);
