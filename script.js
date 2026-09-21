(() => {
	const savedTheme = localStorage.getItem('theme');
	const deviceTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

	function applyTheme(theme) {
		const isDark = theme === 'dark';
		document.body.classList.toggle('dark-mode', isDark);
		document.body.classList.toggle('light-mode', !isDark);

		document.querySelectorAll('.theme-toggle').forEach((button) => {
			button.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
			button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
		});
	}

	window.toggleTheme = () => {
		const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
		localStorage.setItem('theme', nextTheme);
		applyTheme(nextTheme);
	};

	applyTheme(savedTheme || deviceTheme);
})();

