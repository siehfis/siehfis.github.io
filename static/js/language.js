function toggleLanguage() {
    const currentLang = document.documentElement.lang;
    const newLang = currentLang === 'ru' ? 'en' : 'ru';

    fetch('/switch-language', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ lang: newLang })
    }).then(() => {
        window.location.reload();
    });
}