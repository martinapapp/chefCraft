# ChefCraft

![React Badge](https://img.shields.io/badge/Learning-React-61dafb)
![AI Badge](https://img.shields.io/badge/API-AI_Integration-green)

This is a project I built to practice working with React and AI integrations. I learned how to manage complex state, use refs for DOM manipulation, and fetch AI-generated content based on user input.
*[link here](https://chefcraft.onrender.com)*
## Index

- [About](#about)
- [Usage](#usage)
- [Development](#development)
- [Changelog](#changelog)
- [Contribution](#contribution)
- [License](#license)

---

## About
ChefCraft is an interactive recipe generator designed to help users cook with what they have. The main goal was to learn how to:

- Use `useState` and `useEffect` to manage a growing list of ingredients and AI responses.
- Implement `useRef` with `React.forwardRef` and `scrollIntoView` to smoothly scroll the UI to the recipe once it's generated.
- Handle form submissions using React's `action` prop pattern to update state.
- Integrate with the HuggingFace Inference API to transform a list of ingredients into a formatted Markdown recipe.
- (new) Move API calls to an Express backend to handle CORS restrictions and keep credentials secure.

---

## Usage

### Installation
Since this project uses **Vite**, you'll need to install the dependencies first:

1. Clone the repo.
2. Run `npm install` to install all dependencies (React, Vite, HuggingFace SDK, etc.).
3. **Set up your API key** (see [Setup](#setup) below).
4. Run `npm run dev` to start the local server.
5. Run `node server.js` in a second terminal to start the Express backend.

### Setup (Environment Variables)
To make the AI work, you need your own API key from HuggingFace.

1. Create a `.env` file in the root directory.
2. Add your key using the following format:
   ```text
   HF_ACCESS_TOKEN=your_huggingface_token_here
   ```

### Commands

I'm using Vite to make development faster. Here are the main scripts I use:

`npm run dev` - Starts the project so I can see changes live.

`node server.js` - Starts the Express backend that proxies HuggingFace API calls.

`npm run build` - Prepares the project for the real world (deployment).

`npm run preview` - Lets me check the build version locally.

---

## Development

### Pre-Requisites:
- Node.js installed
- HuggingFace account with an access token (free)
- A modern browser

### Build
The app centers around a central state in `Main.jsx`. Users add ingredients via a form, which updates the ingredients array in state. Once the user has more than 3 ingredients, a "Get a Recipe" prompt appears. Clicking it calls the Express backend at `/api/recipe` via `ai.js`, which proxies the request to HuggingFace and returns a Markdown string. The app stores this in state, renders the `ClaudeRecipe` component, and uses a `useEffect` hook with `React.forwardRef` and a `ref` to automatically scroll the user down to their freshly generated recipe.

---

## Changelog

### v1.1.0
**Migrated API calls from frontend to Express backend**

The original version called the HuggingFace Inference API directly from the browser. This worked in development but broke in production because HuggingFace blocks browser requests (CORS). It also exposed the API token in the client bundle.

To fix this, an Express server (`server.js`) was added to proxy all HuggingFace requests server-side. The frontend now calls `/api/recipe` on its own backend, which holds the token securely in an environment variable.

At the same time, HuggingFace deprecated their `api-inference.huggingface.co` endpoint. The new URL is `router.huggingface.co/v1/chat/completions`, which also requires specifying a provider via a `:provider` suffix on the model name (e.g. `meta-llama/Llama-3.1-8B-Instruct:cerebras`).

**What changed:**
- Added `server.js` — Express server that proxies requests to HuggingFace
- Updated `ai.js` — now calls the local backend instead of HuggingFace directly
- Updated HuggingFace API URL to `router.huggingface.co/v1/chat/completions`
- Switched model to `meta-llama/Llama-3.1-8B-Instruct:cerebras`
- Moved `express`, `cors`, and `node-fetch` to `dependencies`
- Renamed env variable from `VITE_HF_ACCESS_TOKEN` to `HF_ACCESS_TOKEN` (no longer exposed to the frontend)

## Contribution
1. Found a bug? Open an issue and I'll try to fix it.
2. Advice? If you have ideas for better prompt engineering or a more stable HuggingFace model to use, let me know!


## License
Feel free to use this for your own practice! **MIT** License.
