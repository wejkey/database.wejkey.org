let currentTab = 'overview';

function switchTab(tabName) {
    currentTab = tabName;

    const tabs = document.querySelectorAll('.tab-button');
    tabs.forEach(tab => {
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => {
        if (content.id === tabName + '-tab') {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
}

async function loadMarkdown(filePath, targetId) {
    try {
        const response = await fetch(filePath);
        const markdown = await response.text();
        const html = parseMarkdown(markdown);
        document.getElementById(targetId).innerHTML = html;
    } catch (error) {
        console.error('Error loading markdown:', error);
        document.getElementById(targetId).innerHTML = '<p>Failed to load content.</p>';
    }
}

function parseMarkdown(markdown) {
    let html = markdown;

    const codeBlocks = [];
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, function(_, lang, code) {
        const id = `{{CODEBLOCK_${codeBlocks.length}}}`;
        codeBlocks.push({ lang: lang || '', code: code });
        return id;
    });

    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');

    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    html = html.replace(/~~(.*?)~~/g, '<del>$1</del>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    html = html.replace(/\`(.*?)\`/g, '<code>$1</code>');

    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

    const lines = html.split('\n');
    const processed = [];
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];

        if (/^---+$/.test(line.trim())) {
            processed.push('<hr>');
            i++;
            continue;
        }

        if (/^\|(.+)\|$/.test(line.trim())) {
            const tableLines = [];
            while (i < lines.length && /^\|(.+)\|$/.test(lines[i].trim())) {
                tableLines.push(lines[i]);
                i++;
            }

            let tableHtml = '<table>';
            tableLines.forEach((tableLine, idx) => {
                if (idx === 1 && /^\|[\s\-:|]+\|$/.test(tableLine.trim())) {
                    return;
                }

                const cells = tableLine.split('|').filter(cell => cell.trim() !== '');
                const tag = idx === 0 ? 'th' : 'td';
                tableHtml += '<tr>';
                cells.forEach(cell => {
                    tableHtml += `<${tag}>${cell.trim()}</${tag}>`;
                });
                tableHtml += '</tr>';
            });
            tableHtml += '</table>';
            processed.push(tableHtml);
            continue;
        }

        if (/^- \[[ x]\]/.test(line.trim())) {
            const taskLines = [];
            while (i < lines.length && /^- \[[ x]\]/.test(lines[i].trim())) {
                taskLines.push(lines[i]);
                i++;
            }

            let taskHtml = '<ul class="task-list">';
            taskLines.forEach(taskLine => {
                const checked = /^- \[x\]/i.test(taskLine.trim());
                const text = taskLine.replace(/^- \[[ x]\]\s*/i, '');
                taskHtml += `<li class="task-item"><input type="checkbox" ${checked ? 'checked' : ''} disabled> ${text}</li>`;
            });
            taskHtml += '</ul>';
            processed.push(taskHtml);
            continue;
        }

        if (/^[\*\-] /.test(line.trim())) {
            const listLines = [];

            while (i < lines.length) {
                const currentLine = lines[i];
                if (!/^[\s]*[\*\-] /.test(currentLine)) {
                    if (currentLine.trim() === '' || /^[\s]+/.test(currentLine)) {
                        i++;
                        continue;
                    }
                    break;
                }

                const indent = currentLine.search(/[\*\-]/);
                const text = currentLine.replace(/^[\s]*[\*\-]\s*/, '');
                listLines.push({ text, indent });
                i++;
            }

            function buildNestedList(items, startIdx, parentIndent) {
                let html = '<ul>';
                let idx = startIdx;

                while (idx < items.length) {
                    const item = items[idx];

                    if (item.indent < parentIndent) break;
                    if (item.indent > parentIndent) {
                        const nested = buildNestedList(items, idx, item.indent);
                        html = html.slice(0, -5) + nested.html + '</li>';
                        idx = nested.nextIdx;
                        continue;
                    }

                    html += `<li>${item.text}</li>`;
                    idx++;
                }

                html += '</ul>';
                return { html, nextIdx: idx };
            }

            if (listLines.length > 0) {
                const result = buildNestedList(listLines, 0, listLines[0].indent);
                processed.push(result.html);
            }
            continue;
        }

        if (/^\d+\. /.test(line.trim())) {
            const listLines = [];
            while (i < lines.length && /^\d+\. /.test(lines[i].trim())) {
                listLines.push(lines[i]);
                i++;
            }

            let listHtml = '<ol>';
            listLines.forEach(listLine => {
                const text = listLine.replace(/^\d+\.\s*/, '');
                listHtml += `<li>${text}</li>`;
            });
            listHtml += '</ol>';
            processed.push(listHtml);
            continue;
        }

        if (line.trim() === '') {
            processed.push('');
            i++;
            continue;
        }

        processed.push(line);
        i++;
    }

    html = processed.join('\n');

    html = html.replace(/\n{2,}/g, '\n\n');

    const blocks = html.split('\n\n');
    const wrappedBlocks = blocks.map(block => {
        block = block.trim();
        if (block === '') return '';

        if (block.startsWith('<h') || block.startsWith('<ul') ||
            block.startsWith('<ol') || block.startsWith('<table') ||
            block.startsWith('<pre') || block.startsWith('<hr') ||
            block.startsWith('<img') || block.startsWith('<details')) {
            return block;
        }

        const singleLineBreaks = block.split('\n');
        if (singleLineBreaks.length > 1) {
            return '<p>' + singleLineBreaks.join('<br>') + '</p>';
        }

        return '<p>' + block + '</p>';
    });

    html = wrappedBlocks.join('\n\n');

    codeBlocks.forEach((b, idx) => {
        const escaped = b.code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        const langClass = b.lang ? ` class="language-${b.lang}"` : '';
        html = html.replace(`{{CODEBLOCK_${idx}}}`, `<pre><code${langClass}>${escaped}</code></pre>`);
    });

    return html;
}

async function loadChangelog(pluginId) {
    try {
        const response = await fetch(`changelog.json`);
        const changelogList = document.getElementById('changelog-list');

        if (!response.ok) {
            const text = await response.text();
            console.error('Changelog fetch failed:', response.status, response.statusText, text);
            changelogList.innerHTML = '<p>Failed to load changelog (network error).</p>';
            return;
        }

        let data;
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
            data = await response.json();
        } else {
            const text = await response.text();
            try {
                data = JSON.parse(text);
            } catch (e) {
                console.error('Expected JSON but got:', text.slice(0, 500));
                changelogList.innerHTML = '<p>Failed to load changelog (invalid JSON).</p>';
                return;
            }
        }

        if (!data || !Array.isArray(data.versions)) {
            console.error('Changelog JSON has unexpected shape:', data);
            changelogList.innerHTML = '<p>No changelog available.</p>';
            return;
        }

        if (data.versions.length === 0) {
            changelogList.innerHTML = '<p>No changelog entries found.</p>';
            return;
        }

        changelogList.innerHTML = '';
        data.versions.forEach(version => {
            const item = document.createElement('div');
            item.className = 'changelog-item';

            if (version.failed) {
                item.classList.add('failed');
            }

            const statusIcon = version.failed ? '✗' : '✓';
            const tooltip = version.failed ? 'Failed' : 'Success';
            const versionInfo = `v${version.version} - ${version.date}`;
            const description = version.description || 'No description available';

            const statusDiv = document.createElement('div');
            statusDiv.className = 'changelog-status';
            statusDiv.textContent = statusIcon;
            statusDiv.setAttribute('data-tooltip', tooltip);

            item.appendChild(statusDiv);

            const versionTagDiv = document.createElement('div');
            versionTagDiv.className = 'version-tag';
            versionTagDiv.textContent = versionInfo;
            item.appendChild(versionTagDiv);

            const descriptionDiv = document.createElement('div');
            descriptionDiv.className = 'changelog-description';
            descriptionDiv.innerHTML = description;
            item.appendChild(descriptionDiv);

            const downloadLink = document.createElement('a');
            downloadLink.href = version.download;
            downloadLink.className = 'changelog-download';
            downloadLink.textContent = 'Download';
            item.appendChild(downloadLink);

            changelogList.appendChild(item);
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
    const pluginId = pluginMatch ? pluginMatch[1] : null;

    if (pluginId) {
        loadMarkdown('overview.md', 'overview-content');
        loadChangelog(pluginId);
    }

    const tabs = document.querySelectorAll('.tab-button');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            switchTab(this.dataset.tab);
        });
    });
});