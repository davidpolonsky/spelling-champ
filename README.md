# Spelling Champ

A boxing-themed spelling game deployed on Firebase Hosting.

## Links

- **Live Site**: https://spelling-champ.net
- **Firebase Hosting**: https://spelling-champ-872cc.web.app
- **GitHub Repo**: https://github.com/davidpolonsky/spelling-champ
- **Firebase Console**: https://console.firebase.google.com/project/spelling-champ-872cc/overview

## Firebase Setup

- **Project ID**: `spelling-champ-872cc`

## Project Structure

```
spelling-champ/
├── .firebaserc          # Firebase project configuration
├── firebase.json        # Firebase hosting settings
└── public/
    └── index.html       # Main application file
```

## Deployment

To deploy updates:

```bash
firebase deploy --only hosting
```

## Features

### Word Management
- **Settings Panel**: Click the ⚙️ icon to open settings
- **Custom Words**: Add your own spelling words with example sentences
- **Photo Import**: Take or upload a photo of a word list and use Gemini AI to extract words automatically
- **Persistent Storage**: Custom words saved in browser localStorage

### Camera OCR Setup
1. Click the settings ⚙️ icon
2. Go to "Import from Photo" tab
3. Get a free API key from [Google AI Studio](https://aistudio.google.com/apikey)
4. Enter your Gemini API key and save
5. Take or upload a photo of your spelling word list
6. Click "Extract Words" to automatically add them

## Development

The app is a single-page HTML file with embedded CSS and JavaScript. All game logic and styling are contained in `public/index.html`.

Custom words are stored in `localStorage` and persist across sessions.
