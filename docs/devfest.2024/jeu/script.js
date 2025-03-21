(() => {
	"use strict";

	// Toggles
	const toggles = document.querySelectorAll('.toggle');
	toggles.forEach(toggle => {
		const buttons = toggle.querySelectorAll('button');
		buttons.forEach(button => {
			button.addEventListener('click', () => {
				for (let button of buttons) {
					button.setAttribute('aria-pressed', 'false');
				}
				button.setAttribute('aria-pressed', 'true');
			});
		});
	});

	// Dark mode
	if (! window.matchMedia('(prefers-contrast: more)').matches) {
		const switcher = document.getElementById('theme');
		const options = switcher.querySelectorAll('button');
		let button = document.querySelector('[data-scheme="none"]');
		//// Then check for localStorage
		const currentTheme = localStorage.getItem('theme');
		if (currentTheme) {
			document.documentElement.dataset.theme = currentTheme;
			if (currentTheme === 'dark') {
				button = document.querySelector('[data-scheme="dark"]');
			} else if (currentTheme === 'light') {
				button = document.querySelector('[data-scheme="light"]');
			}
		}
		button.setAttribute('aria-pressed', 'true');

		//// Finally handle overriding through buttons
		options.forEach(option => {
			option.addEventListener('click', () => {
				switcher.querySelector('[aria-pressed="true"]').setAttribute('aria-pressed', 'false');
				option.setAttribute('aria-pressed', 'true');
				if (option.dataset.scheme === 'none') {
					delete document.documentElement.dataset.theme;
					localStorage.removeItem('theme');
				} else {
					document.documentElement.dataset.theme = option.dataset.scheme;
					localStorage.setItem('theme', option.dataset.scheme);
				}
			});
		});
	}
})(document);
