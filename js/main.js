document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.sidebar-nav a');

    links.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (currentPath === linkPath ||
            (currentPath.endsWith('/') && linkPath.endsWith('index.html') && currentPath.replace(/\/$/, '') === linkPath.replace(/\/index\.html$/, ''))) {
            link.classList.add('active');
        }
    });
});