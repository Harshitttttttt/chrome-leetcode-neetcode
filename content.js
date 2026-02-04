// LeetCode Neetcode Search Extension
// Adds a button next to LeetCode problem titles to search on Neetcode

(function () {
	"use strict";

	const BUTTON_ID = "neetcode-search-btn";
	let observer = null;

	/**
	 * Extracts the problem title from the page
	 * Handles format like "75. Sort Colors"
	 */
	function getProblemTitle() {
		// Try to find the problem title element
		const titleSelectors = [
			'div[data-cy="question-title"]',
			"div.text-title-large a",
			"a.text-title-large",
			'[class*="text-title-large"]',
			'div[class*="flexRow"] a[href*="/problems/"]',
		];

		for (const selector of titleSelectors) {
			const element = document.querySelector(selector);
			if (element && element.textContent.trim()) {
				const text = element.textContent.trim();
				// Check if it matches the pattern "number. title"
				if (/^\d+\.\s+/.test(text)) {
					return text;
				}
			}
		}

		// Fallback: Look for any element with the problem number pattern
		const allElements = document.querySelectorAll("a, div, span, h1, h2, h3");
		for (const el of allElements) {
			const text = el.textContent.trim();
			// Match pattern like "75. Sort Colors" but not too long (to avoid grabbing parent containers)
			if (
				/^\d+\.\s+[A-Za-z]/.test(text) &&
				text.length < 100 &&
				text.split("\n").length === 1
			) {
				return text;
			}
		}

		return null;
	}

	/**
	 * Finds the title container element to insert the button next to
	 */
	function findTitleContainer() {
		const selectors = [
			'div[data-cy="question-title"]',
			"div.text-title-large",
			"a.text-title-large",
			'[class*="text-title-large"]',
		];

		for (const selector of selectors) {
			const element = document.querySelector(selector);
			if (element) {
				return element;
			}
		}

		// Fallback: find element containing problem title pattern
		const allElements = document.querySelectorAll("a, div, span");
		for (const el of allElements) {
			const text = el.textContent.trim();
			if (
				/^\d+\.\s+[A-Za-z]/.test(text) &&
				text.length < 100 &&
				text.split("\n").length === 1
			) {
				// Make sure this is a leaf-ish node (not a huge container)
				if (el.children.length <= 2) {
					return el;
				}
			}
		}

		return null;
	}

	/**
	 * Creates the Neetcode search button
	 */
	function createNeetcodeButton() {
		const button = document.createElement("button");
		button.id = BUTTON_ID;
		button.className = "neetcode-btn";
		button.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="M21 21l-4.35-4.35"></path>
      </svg>
      <span>Neetcode</span>
    `;
		button.title = "Search on Neetcode";

		button.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();

			const problemTitle = getProblemTitle();
			if (problemTitle) {
				const searchQuery = encodeURIComponent(`${problemTitle} Neetcode`);
				const searchUrl = `https://www.google.com/search?q=${searchQuery}`;
				window.open(searchUrl, "_blank");
			} else {
				alert("Could not find problem title. Please try refreshing the page.");
			}
		});

		return button;
	}

	/**
	 * Inserts the Neetcode button next to the problem title
	 */
	function insertButton() {
		// Check if button already exists
		if (document.getElementById(BUTTON_ID)) {
			return;
		}

		const titleContainer = findTitleContainer();
		if (!titleContainer) {
			return;
		}

		const button = createNeetcodeButton();

		// Insert the button after the title element
		const parent = titleContainer.parentElement;
		if (parent) {
			// Create a wrapper to ensure proper positioning
			const wrapper = document.createElement("div");
			wrapper.className = "neetcode-btn-wrapper";
			wrapper.appendChild(button);

			// Try to insert after the title element
			if (titleContainer.nextSibling) {
				parent.insertBefore(wrapper, titleContainer.nextSibling);
			} else {
				parent.appendChild(wrapper);
			}
		}
	}

	/**
	 * Initialize the extension
	 */
	function init() {
		// Try to insert immediately
		insertButton();

		// Also observe for dynamic page changes (LeetCode is a SPA)
		observer = new MutationObserver((mutations) => {
			// Debounce the check
			if (!document.getElementById(BUTTON_ID)) {
				insertButton();
			}
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});

		// Retry a few times in case the page loads slowly
		const retryIntervals = [500, 1000, 2000, 3000, 5000];
		retryIntervals.forEach((delay) => {
			setTimeout(() => {
				if (!document.getElementById(BUTTON_ID)) {
					insertButton();
				}
			}, delay);
		});
	}

	// Start when DOM is ready
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", init);
	} else {
		init();
	}
})();
