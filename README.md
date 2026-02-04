# LeetCode Neetcode Search Extension

A Chrome extension that adds a convenient "Neetcode" button next to LeetCode problem titles, allowing you to quickly search for the problem solution on Neetcode.

## Features

- 🔍 Adds a **Neetcode** button right next to the problem title (e.g., "75. Sort Colors")
- 🚀 One-click opens a new tab with Google search: `"{problem title} Neetcode"`
- 🎨 Beautiful button design that matches LeetCode's dark theme
- ⚡ Works seamlessly with LeetCode's single-page application

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in the top-right corner)
3. Click **Load unpacked**
4. Select the `chrome-leetcode-neetcode` folder
5. The extension is now installed!

## Usage

1. Go to any LeetCode problem page (e.g., https://leetcode.com/problems/sort-colors/)
2. Look for the orange **Neetcode** button next to the problem title
3. Click the button to search for the problem solution on Neetcode

## How It Works

The extension injects a content script that:

1. Detects when you're on a LeetCode problem page
2. Finds the problem title (e.g., "75. Sort Colors")
3. Adds a styled button next to the title
4. When clicked, opens a Google search for `"{problem number}. {problem name} Neetcode"`

## Files

- `manifest.json` - Chrome extension manifest (Manifest V3)
- `content.js` - Content script that injects the button
- `styles.css` - Button styling
- `icons/` - Extension icons

## Development

To modify the extension:

1. Make changes to the source files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card

## License

MIT License
