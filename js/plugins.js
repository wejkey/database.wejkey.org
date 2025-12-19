let currentTab = 'overview';

function switchTab(tabName) {
    currentTab = tabName;
    document.querySelectorAll('.tab-button').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === tabName);
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === `${tabName}-tab`);
    });
}

async function loadMarkdown(filePath, targetId) {
    try {
        const response = await fetch(filePath);
        const markdown = await response.text();
        const html = marked.parse(markdown, { mangle: false, headerIds: false });
        const target = document.getElementById(targetId);
        if (target) target.innerHTML = html;
    } catch (error) {
        console.error('Error loading markdown:', error);
        document.getElementById(targetId).innerHTML = '<p>Failed to load content.</p>';
    }
}

async function loadChangelog() {
    try {
        const response = await fetch('changelog.json');
        if (!response.ok) throw new Error('Network error');
        const data = await response.json();
        const changelogList = document.getElementById('changelog-list');

        if (!data || !Array.isArray(data.versions) || data.versions.length === 0) {
            changelogList.innerHTML = '<p>No changelog entries found.</p>';
            return;
        }

        const statusClass = {
            stable: 'status-stable',
            experimental: 'status-experimental',
            failed: 'status-failed',
            error: 'status-failed'
        };
        const statusAccent = {
            stable: '#22c55e',
            experimental: '#3b82f6',
            failed: '#ef4444',
            error: '#ef4444'
        };
        const statusLabel = {
            stable: 'Stable',
            experimental: 'Experimental',
            failed: 'Failed',
            error: 'Failed'
        };

        changelogList.innerHTML = '';
        data.versions.forEach(version => {
            const status = (version.status || (version.failed ? 'failed' : 'stable')).toLowerCase();
            const entry = document.createElement('article');
            entry.className = `changelog-entry ${statusClass[status] || ''}`.trim();
            entry.style.setProperty('--entry-accent', statusAccent[status] || '#22c55e');

            entry.innerHTML = `
                <div class="entry-meta">
                    <span class="entry-date">${version.date || 'Date pending'}</span>
                </div>
                <div class="entry-main">
                    <div class="entry-text">
                        <h3 class="entry-version">Version ${version.version}</h3>
                        <p class="entry-description">${version.description || 'No description available'}</p>
                        <span class="entry-support">${version.support || 'Support information unavailable'}</span>
                    </div>
                    <div class="entry-actions">
                        <a href="${version.download}" class="changelog-download">Download</a>
                    </div>
                </div>
            `;
/* why are you even here?? */
            changelogList.appendChild(entry);
        });
    } catch (error) {
        console.error('Error loading changelog:', error);
        const el = document.getElementById('changelog-list');
        if (el) el.innerHTML = '<p>Failed to load changelog.</p>';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const pluginPath = window.location.pathname;
    const pluginMatch = pluginPath.match(/projects\/([^\/]+)\//);
    if (pluginMatch) {
        loadMarkdown('overview.md', 'overview-content');
        loadChangelog();
    }

    document.querySelectorAll('.tab-button').forEach(tab => {
        tab.addEventListener('click', function() { switchTab(this.dataset.tab); });
    });
});