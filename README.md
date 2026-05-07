# StockWatch
StockWatch is an investment training website that uses live stock data and analytics with artificial funds to help teach users how to properly invest in the stock market.
# The Team
Our team at FLACC Finance is comprised of Luke Pressimone, Chase Langley, Colin Thompson, Francis Horter and Aaron Sanders.

#Live Site: https://stockwatcher-8f664.web.app

## Tech Stack
| Layer | Technology |
| Frontend | HTML, CSS, JavaScript |
| Backend / Database | Firebase (Firestore, Authentication, Hosting) |
| Stock Data API | Finnhub |
| AI Assistant | OpenAI API |

---

## Prerequisites — Software to Install

### 1. Visual Studio Code
Download and install VS Code from https://code.visualstudio.com

### 2. Node.js
Download and install Node.js (LTS version) from https://nodejs.org

Verify installation by opening a terminal and running:
```
node -v
npm -v
```
Both commands should return a version number.

### 3. Live Server (VS Code Extension)
1. Open VS Code
2. Click the Extensions icon in the left sidebar
3. Search for **Live Server** by Ritwick Dey
4. Click Install

### 4. Firebase CLI
Open a terminal and run:
```
sudo npm install -g firebase-tools
```
Verify installation:
```
firebase --version
```

---

## API Keys Required

You will need the following API keys to run the project. These are stored in `config.js` which is gitignored and must be created manually (see setup steps below).

| Service | Purpose | Where to get it |
| Firebase | Auth + Database | console.firebase.google.com |
| Finnhub | Live stock data | finnhub.io |
| OpenAI | AI assistant | platform.openai.com |

---

## Setup Instructions

### Step 1 — Clone the Repository
```
git clone https://github.com/LukePress/StockWatch.git
cd StockWatch
```

### Step 2 — Create config.js
The `config.js` file is gitignored for security. You must create it manually inside the `src/` folder.

Create a file at `src/config.js` with the following content:
```
// Firebase configuration
const firebaseConfig = {
  apiKey:            "YOUR_FIREBASE_API_KEY",
  authDomain:        "YOUR_PROJECT.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

// Finnhub — get a free key at finnhub.io
const FINNHUB_KEY = 'YOUR_FINNHUB_KEY';

// OpenAI — get a key at platform.openai.com
const OPENAI_KEY = 'YOUR_OPENAI_KEY';
```

Replace each placeholder with your actual API keys.

### Step 3 — Firebase Setup
1. Go to https://console.firebase.google.com
2. Create a new project (or use an existing one)
3. Enable **Authentication** → Sign-in method → **Email/Password**
4. Create a **Firestore Database** in production mode
5. Set Firestore Rules to:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow create: if request.auth != null;
      allow read, update, delete: if request.auth != null && request.auth.uid == userId;
    }
    match /users/{userId}/transactions/{transactionId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```
6. Copy your Firebase config from **Project Settings → General → Your apps** into `config.js`

---

## Running the Project Locally

### Option A — Live Server (Recommended for development)
1. Open the `StockWatch` folder in VS Code
2. Right-click `src/index.html` in the file explorer
3. Select **Open with Live Server**
4. Your browser will open at `http://127.0.0.1:5500/src/`

### Option B — Access the live deployed site
## Deploying to Firebase Hosting

### First time setup
```
firebase login
firebase init hosting
```
When prompted:
- Select your Firebase project
- Set public directory to: `src`
- Configure as single-page app: **No**
- Overwrite index.html: **No**

### Deploy
```
firebase deploy --force
```

The live URL will be shown in the terminal after deployment completes.


## Features
- **Simulated Trading** — Buy and sell real stocks using virtual money
- **Live Stock Data** — Real-time prices powered by Finnhub API
- **Portfolio Tracking** — View holdings with live gain/loss calculations
- **Transaction History** — Full log of all trades
- **Watchlist** — Save stocks to monitor with live prices
- **Financial News** — Browse market news by category or stock symbol
- **AI Assistant** — Ask investing questions powered by OpenAI
- **Email Verification** — Secure account creation with email confirmation

## Notes
- `config.js` is gitignored — never commit API keys to GitHub
- The Finnhub free tier allows 60 API requests per minute
- OpenAI charges per request — for a class project, usage costs are minimal
- Firebase Hosting, Auth, and Firestore are all on the free Spark plan
