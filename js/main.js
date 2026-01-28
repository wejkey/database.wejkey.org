function toggleSection(element) {
    const section = element.closest('.nav-section');
    section.classList.toggle('expanded');

    const sectionId = section.id;
    if (sectionId) {
        const expandedSections = JSON.parse(localStorage.getItem('expandedSections') || '[]');
        if (section.classList.contains('expanded')) {
            if (!expandedSections.includes(sectionId)) {
                expandedSections.push(sectionId);
            }
        } else {
            const index = expandedSections.indexOf(sectionId);
            if (index > -1) {
                expandedSections.splice(index, 1);
            }
        }
        localStorage.setItem('expandedSections', JSON.stringify(expandedSections));
    }
}

function updateActiveNavLinks() {
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;

    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.classList.remove('active');

        const linkUrl = new URL(link.href);
        const linkPath = linkUrl.pathname;
        const linkHash = linkUrl.hash;

        if (currentPath === linkPath || (currentPath.endsWith('/') && linkPath.endsWith('index.html') && currentPath.replace(/\/$/, '') === linkPath.replace(/\/index\.html$/, ''))) {
            if (linkHash && currentHash) {
                if (linkHash === currentHash) {
                    link.classList.add('active');
                }
            } else if (!linkHash) {
                link.classList.add('active');
            }
        }
    });
}

function restoreExpandedSections() {
    const expandedSections = JSON.parse(localStorage.getItem('expandedSections') || '[]');
    expandedSections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.add('expanded');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateActiveNavLinks();
    restoreExpandedSections();
});

window.addEventListener('hashchange', () => {
    updateActiveNavLinks();
    restoreExpandedSections();
});