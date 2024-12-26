function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(theme) {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
    updateThemeIcon();

    fetch('/set-theme', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ theme: theme })
    });
}

function updateThemeIcon() {
    const icon = document.getElementById('theme-icon');
    icon.className = `bi bi-${document.body.classList.contains('dark') ? 'sun' : 'moon'}`;
}

function toggleTheme() {
    const currentTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
    setTheme(currentTheme);
}

function isNightTime() {
    const hour = new Date().getHours();
    return hour >= 20 || hour < 6;
}

function showThemePrompt() {
    const promptDiv = document.createElement('div');
    promptDiv.className = 'theme-prompt';
    promptDiv.innerHTML = `
        <div class="alert alert-info alert-dismissible fade show" role="alert">
            <strong>Уже поздно!</strong> Хотите переключиться на темную тему?
            <button type="button" class="btn btn-sm btn-dark ms-3" onclick="acceptThemeChange()">Да</button>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    document.body.insertBefore(promptDiv, document.body.firstChild);
}

function acceptThemeChange() {
    setTheme('dark');
    document.querySelector('.theme-prompt').remove();
}

function initTheme() {
    const systemTheme = getSystemTheme();
    const savedTheme = localStorage.getItem('theme');

    setTheme(systemTheme);

    if (systemTheme === 'light' && isNightTime()) {
        showThemePrompt();
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
}

document.addEventListener('DOMContentLoaded', initTheme);