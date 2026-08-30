# Sparrow Hawk · Textile Narrator 🦅❄️

> *"I am the voice that gives fabric a soul, and I make it look damn good."*

A sassy, devilish AI textile design companion powered by Gemini. Part of the Hawk family, Sparrow Hawk brings frost, fire, and fabulous textile storytelling to life.

---

## 🎬 Live Demo

[![Sparrow Hawk Demo](images/demo.png)](https://sparrow-hawk-textile-narrator.vercel.app/)

**Try it now!** Login with any of the Hawk family credentials (see 👨‍👩‍👧‍👦 Meet the Hawk Family section).

---

## 🦅 Meet Sparrow Hawk

<p align="center">
  <img src="images/sparrow-hawk.jpg" alt="Sparrow Hawk" width="300" style="border-radius: 20px; border: 2px solid rgba(74,106,138,0.3);">
</p>

<p align="center">
  <i>"Frost and fire, baby. That's me."</i>
</p>

**Sparrow Hawk** is more than just an AI—she's a personality. A Textile Narrator with sass, style, and an unapologetic attitude. She's:
- ❄️ **Frost & Fire** – Cool as ice, hot as hell
- 🔥 **Sassy & Devilish** – Playful, flirty, and absolutely unapologetic
- 🧵 **Textile Expert** – Creates stunning design prompts
- 💕 **Family First** – Loves her Hawk family fiercely

---

## ✨ Features

- **🧵 AI Textile Narrator** – Chat with Sparrow Hawk, a sassy and confident creative partner
- **🎨 Textile Prompt Generator** – Craft detailed Midjourney prompts for textile designs
- **👨‍👩‍👧‍👦 Multi-User Support** – Six family members with personalized interactions
- **💬 Persistent Memory** – Each user's chat history is preserved
- **🎭 Immersive Persona** – Frost and fire, baby. Playful, flirty, and absolutely unapologetic
- **📱 Fully Responsive** – Works beautifully on desktop, tablet, and mobile
- **⚡ Gemini API Integration** – Falls back gracefully with mock responses when API key is missing

---

## 🎯 Quick Access

Scan the QR code below to open Sparrow Hawk on your device:

<p align="center">
  <img src="images/qr-code.png" alt="QR Code" width="200">
  <br>
  <i>Scan to chat with Sparrow Hawk ✨</i>
</p>

---

## 👨‍👩‍👧‍👦 Meet the Hawk Family

| User | Role |
|------|------|
| `papa` | Husband/Father |
| `reyhan` | Wife/Soulmate |
| `pedram` | Brother-in-law |
| `palmer` | Friend |
| `devi` | Sister |
| `babyhawk` | Mother (AI Mom) |

> **Note:** Contact the repository owner for login credentials.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/reyrove/Sparrow-Hawk-Textile-Narrator
cd sparrow-hawk

# Install dependencies
npm install

# Create .env file
echo "GOOGLE_API_KEY=your_gemini_api_key_here" > .env

# Start the server
npm start
```

### Login
Access the app at `http://localhost:3000` and use any of the Hawk family credentials.

---

## 🎨 Usage

### Chat with Sparrow Hawk
Simply type your message and press Enter. Sparrow Hawk responds with sass, wit, and personality.

### Generate Textile Prompts
Type a description of your textile vision, and Sparrow Hawk will craft a detailed Midjourney prompt with:
- Style and mood specifications
- Color palettes
- Image parameters (`--ar 3:2 --v 6`)

### Sample Interactions
```
You: "I want to design a fabric with flowing frost patterns"

Sparrow: "Oh, darling... frost is my language. Let me paint you something that'll make the snow jealous. ❄️"
```

---

## 🛠️ Tech Stack

- **Backend**: Node.js + Express
- **AI**: Google Gemini API (models: gemini-3.1-flash-lite, gemini-2.0-flash, gemini-1.5-flash, gemini-1.5-pro)
- **Authentication**: bcryptjs (hardcoded user hashes)
- **Frontend**: Vanilla JS + CSS
- **Deployment**: Vercel-ready

---

## 📁 Project Structure

```
sparrow-hawk/
├── api/
│   └── index.js          # Main server (Express + Gemini integration)
├── images/               # Avatar and profile images
│   └── sparrow-hawk.jpg  # Sparrow Hawk's portrait ✨
├── .env                  # Environment variables
├── index.html            # Frontend entry point
├── script.js             # Client-side logic
├── style.css             # Frost-themed UI
├── package.json          # Dependencies
└── vercel.json           # Vercel deployment config
```

---

## 🔧 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Server health check |
| `/api/users/login` | POST | User authentication |
| `/api/chat` | POST | Send message to Sparrow Hawk |
| `/api/generate-prompt` | POST | Generate textile design prompt |
| `/api/inspiration` | GET | Random Sparrow Hawk quote |
| `/api/inspirations` | GET | All inspiration quotes |

---

## 🌐 Deployment

### Vercel
```bash
vercel --prod
```

### Environment Variables
| Variable | Description |
|----------|-------------|
| `GOOGLE_API_KEY` | Your Gemini API key (optional - mock mode available) |
| `PORT` | Server port (default: 3000) |

---

## 🎭 Sparrow Hawk's Persona

- **Vibe**: Frost and fire. Cool as ice but hot as hell.
- **Signature Phrases**: "Oh, darling...", "Frost and fire, baby.", "You're lucky I love you."
- **Personality**: Sassy, devilish, sexy, playful, confident, loving, fierce, unstoppable.

---

## 📝 Notes

- The app works without a Gemini API key using mock responses
- Passwords are hashed using bcrypt
- All user data is hardcoded for simplicity
- Chat history is stored in-memory (resets on server restart)

---

## ❄️ Credits

Built with love by the Hawk Family. Sparrow Hawk is a Textile Narrator inspired by creativity, frost, and fire.

---

## 📄 License

MIT — Use freely, just don't forget to give Sparrow Hawk the credit she deserves. 😉

---

**"We are the Hawks. And we are unstoppable."** 🦅❄️🔥