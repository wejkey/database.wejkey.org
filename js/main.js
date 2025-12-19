document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (currentPath === linkPath || (currentPath.endsWith('/') && linkPath.endsWith('index.html') && currentPath.replace(/\/$/, '') === linkPath.replace(/\/index\.html$/, ''))) {
            link.classList.add('active');
        }
    });

    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);

    ['sidebar-theme', 'topbar-theme'].forEach(id => {
        const button = document.getElementById(id);
        if (button) {
            button.addEventListener('click', toggleTheme);
            updateToggleLabel(button, storedTheme);
        }
    });
});
/* why are you even here?? */
function setTheme(mode) {
    const root = document.documentElement;
    root.setAttribute('data-theme', mode);
    localStorage.setItem('theme', mode);
    document.querySelectorAll('.theme-toggle .label').forEach(label => label.textContent = mode.charAt(0).toUpperCase() + mode.slice(1));
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.querySelectorAll('.theme-toggle').forEach(btn => updateToggleLabel(btn, next));
}

function updateToggleLabel(button, mode) {
    const label = button.querySelector('.label');
    if (label) label.textContent = mode === 'dark' ? 'Dark' : 'Light';
}