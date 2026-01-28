let currentTab = 'overview';

function switchTab(tabName) {
    currentTab = tabName;
    document.querySelectorAll('.tab-button').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === tabName);
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === `${tabName}-tab`);
    });
    window.location.hash = tabName;
}

async function loadMarkdown(filePath, targetId) {
    try {
        const response = await fetch(filePath);
        const markdown = await response.text();
        const html = marked.parse(markdown, { mangle: false, headerIds: false });
        const target = document.getElementById(targetId);
        if (target) {
            target.innerHTML = html;
            addCopyButtons();
        }
    } catch (error) {
        console.error('Error loading markdown:', error);
        document.getElementById(targetId).innerHTML = '<p>Failed to load content.</p>';
    }
}

function addCopyButtons() {
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach((codeBlock) => {
        const pre = codeBlock.parentElement;
        if (pre.querySelector('.copy-code-btn')) return;

        const button = document.createElement('button');
        button.className = 'copy-code-btn';
        button.textContent = 'Copy';
        button.setAttribute('aria-label', 'Copy code to clipboard');

        button.addEventListener('click', async () => {
            const code = codeBlock.textContent;
            try {
                await navigator.clipboard.writeText(code);
                button.textContent = 'Copied!';
                button.classList.add('copied');
                setTimeout(() => {
                    button.textContent = 'Copy';
                    button.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
                button.textContent = 'Failed';
                setTimeout(() => {
                    button.textContent = 'Copy';
                }, 2000);
            }
        });

        pre.appendChild(button);
    });
}

async function loadChangelog() {
    try {
        const response = await fetch('changelog.json');
        if (!response.ok) throw new Error('Network error');
        const data = await response.json();
        const pluginPath = window.location.pathname;
        const pluginMatch = pluginPath.match(/projects\/([^\/]+)\//);
        const pluginName = pluginMatch ? pluginMatch[1] : '';
        const changelogList = document.getElementById(`${pluginName}-changelog`) || document.getElementById('changelog-list');

        if (!data || !Array.isArray(data.versions) || data.versions.length === 0) {
            changelogList.innerHTML = '<p>No changelog entries found.</p>';
            return;
        }

        const statusClass = {
            stable: 'status-stable',
            experimental: 'status-development',
            development: 'status-development',
            failed: 'status-unstable',
            unstable: 'status-unstable',
            error: 'status-unstable',
            legacy: 'status-legacy'
        };

        changelogList.innerHTML = '';
        data.versions.forEach(version => {
            const status = (version.status || (version.failed ? 'failed' : 'stable')).toLowerCase();
            const filename = version.name || version.download.split('/').pop();

            const entry = document.createElement('a');
            entry.href = version.download;
            entry.className = `changelog-entry ${statusClass[status] || 'status-stable'}`.trim();

            entry.innerHTML = `
                <div class="entry-version">${version.version}</div>
                <div class="entry-filename">${filename}</div>
                <div class="entry-description">${version.description || ''}</div>
                <div class="entry-date">${version.date || 'Date pending'}</div>
            `;

            changelogList.appendChild(entry);
        });
    } catch (error) {
        console.error('Error loading changelog:', error);
        const pluginPath = window.location.pathname;
        const pluginMatch = pluginPath.match(/projects\/([^\/]+)\//);
        const pluginName = pluginMatch ? pluginMatch[1] : '';
        const el = document.getElementById(`${pluginName}-changelog`) || document.getElementById('changelog-list');
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

    const hash = window.location.hash.slice(1);
    if (hash && ['overview', 'gallery', 'changelog'].includes(hash)) {
        switchTab(hash);
    }
});

window.addEventListener('hashchange', function() {
    const hash = window.location.hash.slice(1);
    if (hash && ['overview', 'gallery', 'changelog'].includes(hash)) {
        currentTab = hash;
        document.querySelectorAll('.tab-button').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === hash);
        });
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.toggle('active', content.id === `${hash}-tab`);
        });
    }
});