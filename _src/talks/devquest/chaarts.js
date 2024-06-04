(() => {
	"use strict";

	function handleTabindex(region) {
		const width = region.offsetWidth;
		const child = region.querySelector('table') || region.querySelector('code');

		if (child.offsetWidth > width) {
			region.setAttribute('tabindex', '0');
		} else {
			if (region.hasAttribute('tabindex')) {
				region.removeAttribute('tabindex');
			}
		}
	};

	// Scrollable regions
	const regions = document.querySelectorAll('.scrollable-container');
	regions.forEach(region => handleTabindex(region));

	// Toggle switch component
	const switches = document.querySelectorAll('[role="switch"]');
	switches.forEach(el => {
		el.addEventListener('click', () => {
			const checked = el.getAttribute('aria-checked') === 'true' || false;
			el.setAttribute('aria-checked', !checked);

			if (el.classList.contains('disable-css')) {
				const chart = el.parentNode.nextElementSibling;
				chart.classList.toggle('chaarts');
				handleTabindex(el.parentElement.parentElement);
			}
		});
	});

	window.addEventListener('resize', () => {
		regions.forEach(region => handleTabindex(region));
	});
})(document);
