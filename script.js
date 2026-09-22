(() => {
	const savedTheme = localStorage.getItem('theme');
	const deviceTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

	function applyTheme(theme) {
		const isDark = theme === 'dark';
		document.body.classList.toggle('dark-mode', isDark);
		document.body.classList.toggle('light-mode', !isDark);

		document.querySelectorAll('.theme-toggle').forEach((button) => {
			const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';
			button.textContent = '';
			button.setAttribute('aria-label', label);
			button.setAttribute('title', label);
		});
	}

	window.toggleTheme = () => {
		const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
		localStorage.setItem('theme', nextTheme);
		applyTheme(nextTheme);
	};

	const originalText = new WeakMap();

	function setLanguage(language) {
		const isJapanese = language === 'ja';
		document.documentElement.lang = isJapanese ? 'ja' : 'en';
		document.querySelectorAll('.language-toggle').forEach((button) => {
			button.classList.toggle('is-japanese', isJapanese);
			button.setAttribute('aria-label', isJapanese ? '英語に切り替え' : 'Switch to Japanese');
			button.setAttribute('title', isJapanese ? '英語に切り替え' : 'Switch to Japanese');
		});

		document.querySelectorAll('[data-ja]').forEach((element) => {
			if (!originalText.has(element)) originalText.set(element, element.textContent);
			element.textContent = isJapanese ? element.dataset.ja : originalText.get(element);
		});
	}

	window.toggleLanguage = () => {
		const nextLanguage = document.documentElement.lang === 'ja' ? 'en' : 'ja';
		localStorage.setItem('language', nextLanguage);
		setLanguage(nextLanguage);
	};

	applyTheme(savedTheme || deviceTheme);
	setLanguage(localStorage.getItem('language') || 'en');

	const featuredProjectsText = document.querySelector('#featured-projects-text');
	const featuredProjects = [
		'Dual-Axis Barrel Scanner',
		'FPGA-based Roll 22 Game',
		'BWSI TA Labs and Projects'
	];

	if (featuredProjectsText) {
		let factIndex = 0;
		const featuredProjectsBubble = featuredProjectsText.parentElement;

		const showNextFeaturedProject = () => {
			factIndex = (factIndex + 1) % featuredProjects.length;
			featuredProjectsText.textContent = featuredProjects[factIndex];
			featuredProjectsBubble.classList.remove('is-popping');
			void featuredProjectsBubble.offsetWidth;
			featuredProjectsBubble.classList.add('is-popping');
		};

		featuredProjectsBubble.addEventListener('click', showNextFeaturedProject);
		window.setInterval(showNextFeaturedProject, 4000);
	}

	document.querySelectorAll('.course-item').forEach((item) => {
		const pill = item.querySelector('.course-pill');
		pill.addEventListener('click', () => {
			const isOpen = item.classList.contains('is-open');
			document.querySelectorAll('.course-item').forEach((other) => {
				other.classList.remove('is-open');
				other.classList.remove('is-hidden');
				const otherPill = other.querySelector('.course-pill');
				otherPill.classList.remove('is-open');
				otherPill.setAttribute('aria-expanded', 'false');
			});

			if (!isOpen) {
				item.classList.add('is-open');
				pill.classList.add('is-open');
				document.querySelectorAll('.course-item').forEach((other) => {
					if (other !== item) other.classList.add('is-hidden');
				});
				pill.setAttribute('aria-expanded', 'true');
			}
		});
	});
})();


