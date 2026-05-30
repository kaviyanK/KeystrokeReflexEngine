# Keystroke Reflex Engine ⚡

A high-intensity, retro-styled keystroke reflex testing game built with React and Vite. Test your reaction time by pressing the correct key before the timer runs out!

## 🎮 Features

- **Custom Word Sets**: Play with the default "leetspeak" words full of numbers and symbols, or enter your own custom list of words to challenge yourself!
- **Rapid-fire Rounds**: The engine flashes a random character from your word set. You have exactly 3 seconds to press the matching key.
- **Dynamic Feedback**: Visual cues with glowing elements and immediate feedback for correct hits, wrong keystrokes, and missed timeouts.
- **Detailed Analytics**: At the end of your session, view a breakdown grid of your performance including your final score and the exact keystrokes you missed or got wrong.

## 🚀 Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite 5
- **Styling:** Vanilla CSS Custom Properties & Animations (No external styling libraries required)

## 🛠️ Installation & Setup

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

1. **Clone or download** this repository.
2. **Open your terminal** and navigate to the project directory:
   ```bash
   cd path/to/Repo
   ```
3. **Install the dependencies**:
   ```bash
   npm install
   ```

## 💻 Running the Game

To play the game locally in development mode:

```bash
npm run dev
```
Once the server starts, open your browser and navigate to `http://localhost:5173` (or the URL provided in your terminal).

## 📦 Building for Production

If you want to build the optimized version of the app for production hosting:

```bash
npm run build
```
This will compile and minify your assets into a `dist/` directory. You can preview the production build locally using:
```bash
npm run preview
```

## 📜 How to Play

1. Start the game by configuring your word list (or keep the difficult defaults) and click **START**.
2. A single character will pop up on the screen.
3. You have **3 seconds** to press the exact matching key on your keyboard.
4. **Scoring:**
   * **+1 Point**: For pressing the correct key.
   * **-1 Point**: For pressing the wrong key.
   * **-1 Point**: For missing the time limit.
5. After 10 rounds, review your final score and see where your reflexes faltered!
