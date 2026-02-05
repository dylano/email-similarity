# Email Similarity

A small UI that helps catch domain typos in customer email addresses. Enter only the domain portion (the part after `user@`) and the app scores similarity against common providers using the Jaro–Winkler algorithm.

## Features

- Domain-only input with instant scoring
- Common provider comparison (Gmail, Yahoo, Outlook, AOL)
- Highlights near-miss matches (0.9–1.0)

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (typically `http://localhost:5173/`).

## Notes

- Similarity is calculated with the Jaro–Winkler algorithm via the `cmpstr` package.
- The UI is intentionally minimal and is a starting point for adding typo rules and suggestions.
