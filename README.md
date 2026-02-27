# ChefCraft

![React Badge](https://img.shields.io/badge/Learning-React-61dafb)
![AI Badge](https://img.shields.io/badge/API-AI_Integration-green)

This is a project I built to practice working with React and AI integrations. I learned how to manage complex state, use refs for DOM manipulation, and fetch AI-generated content based on user input.

## Index

- [About](#about)
- [Usage](#usage)
- [Development](#development)
- [Contribution](#contribution)
- [License](#license)

---

## About
ChefCraft is an interactive recipe generator designed to help users cook with what they have. The main goal was to learn how to:

- Use `useState` and `useEffect` to manage a growing list of ingredients and AI responses.
- Implement `useRef` with `React.forwardRef` and `scrollIntoView` to smoothly scroll the UI to the recipe once it's generated.
- Handle form submissions using React's `action` prop pattern to update state.
- Integrate with the HuggingFace Inference API to transform a list of ingredients into a formatted Markdown recipe.


## Usage

### Installation
Since this project uses **Vite**, you'll need to install the dependencies first:

1. Clone the repo.
2. Run `npm install` to install all dependencies (React, Vite, HuggingFace SDK, etc.).
3. **Set up your API key** (see [Setup](#setup) below).
4. Run `npm run dev` to start the local server.
5. Click the link in your terminal to start cooking!

### Setup (Environment Variables)
To make the AI work, you need your own API key from HuggingFace.

1. Create a `.env` file in the root directory.
2. Add your key using the following format:
   ```text
   VITE_HF_ACCESS_TOKEN=your_huggingface_token_here
   ```
3. Make sure the `.env` file is in the same folder as `package.json`.
4. Restart the dev server after adding the key — Vite only reads `.env` on startup.

### Commands

I'm using Vite to make development faster. Here are the main scripts I use:

`npm run dev` - Starts the project so I can see changes live.

`npm run build` - Prepares the project for the real world (deployment).

`npm run preview` - Lets me check the build version locally.

## Development

### Pre-Requisites:
- Node.js installed
- HuggingFace account with an access token (free)
- A modern browser

### Build
The app centers around a central state in `Main.jsx`. Users add ingredients via a form, which updates the ingredients array in state. Once the user has more than 3 ingredients, a "Get a Recipe" prompt appears. Clicking it calls the HuggingFace Inference API via `ai.js` using `InferenceClient` and returns a Markdown string. The app stores this in state, renders the `ClaudeRecipe` component, and uses a `useEffect` hook with `React.forwardRef` and a `ref` to automatically scroll the user down to their freshly generated recipe.

## Contribution
1. Found a bug? Open an issue and I'll try to fix it.
2. Advice? If you have ideas for better prompt engineering or a more stable HuggingFace model to use, let me know!


## License
Feel free to use this for your own practice! **MIT** License.
