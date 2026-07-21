(function () {
    var storageKey = 'preferred-color-theme';

    function readSavedTheme() {
        try {
            return window.localStorage.getItem(storageKey) === 'dark';
        } catch (error) {
            return false;
        }
    }

    function saveTheme(enabled) {
        try {
            window.localStorage.setItem(storageKey, enabled ? 'dark' : 'light');
        } catch (error) {
            // The theme still works for the current page when storage is unavailable.
        }
    }

    function setDarkMode(enabled, persist) {
        document.documentElement.classList.toggle('dark-mode', enabled);

        document.querySelectorAll('.theme-toggle').forEach(function (button) {
            var icon = button.querySelector('.theme-toggle-icon');

            button.setAttribute('aria-pressed', String(enabled));
            button.setAttribute('aria-label', enabled ? 'Enable day mode' : 'Enable night mode');
            icon.textContent = enabled ? '☀' : '☾';
        });

        if (persist) {
            saveTheme(enabled);
        }
    }

    function initializeTheme() {
        setDarkMode(readSavedTheme(), false);

        document.querySelectorAll('.theme-toggle').forEach(function (button) {
            button.addEventListener('click', function () {
                setDarkMode(!document.documentElement.classList.contains('dark-mode'), true);
            });
        });
    }

    setDarkMode(readSavedTheme(), false);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeTheme);
    } else {
        initializeTheme();
    }

    window.addEventListener('storage', function (event) {
        if (event.key === storageKey) {
            setDarkMode(event.newValue === 'dark', false);
        }
    });
}());
