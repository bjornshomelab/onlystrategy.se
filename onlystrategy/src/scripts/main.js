document.addEventListener('DOMContentLoaded', () => {
    const langSvButton = document.getElementById('lang-sv');
    const langEnButton = document.getElementById('lang-en');
    const translatableElements = document.querySelectorAll('[data-translate-key]');

    const setLanguage = (lang) => {
        // Set html lang attribute
        document.documentElement.lang = lang;

        // Translate elements
        translatableElements.forEach(element => {
            const key = element.getAttribute('data-translate-key');
            if (translations[key] && translations[key][lang]) {
                if (element.tagName === 'TITLE') {
                    element.textContent = translations[key][lang];
                } else if (element.placeholder !== undefined) {
                    element.placeholder = translations[key][lang];
                } else {
                    element.innerHTML = translations[key][lang]; // Use innerHTML to support copyright symbol etc.
                }
            }
        });

        // Update active button state
        if (lang === 'sv') {
            langSvButton.classList.add('active');
            langEnButton.classList.remove('active');
        } else if (lang === 'en') {
            langEnButton.classList.add('active');
            langSvButton.classList.remove('active');
        }

        // Store preference
        localStorage.setItem('preferredLanguage', lang);
    };

    // Event Listeners for language buttons
    if (langSvButton) {
        langSvButton.addEventListener('click', () => setLanguage('sv'));
    }
    if (langEnButton) {
        langEnButton.addEventListener('click', () => setLanguage('en'));
    }

    // Load preferred language or default to Swedish
    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'sv';
    setLanguage(preferredLanguage);
});
