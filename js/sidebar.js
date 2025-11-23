document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('/data/plugins.json');
        const data = await response.json();

        const projectsList = document.getElementById('projects-list');
        if (projectsList && data.plugins) {
            projectsList.innerHTML = '';
            data.plugins.forEach(plugin => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = `/projects/${plugin.id}/index.html`;
                a.textContent = plugin.name;
                li.appendChild(a);
                projectsList.appendChild(li);
            });
        }
    } catch (error) {
        console.log('Using static plugin list');
    }
});