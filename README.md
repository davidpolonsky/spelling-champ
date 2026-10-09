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

## Development

The app is a single-page HTML file with embedded CSS and JavaScript. All game logic and styling are contained in `public/index.html`.
