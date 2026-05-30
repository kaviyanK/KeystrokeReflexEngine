import React, { useState, useEffect, useRef, useCallback } from "react";
import { randomCharFromWords, isPrintable } from "../utils/helpers";
import SetupScreen from "./SetupScreen";
import GameScreen from "./GameScreen";
import ResultScreen from "./ResultScreen";

const DEFAULT_WORDS = [
  "Swift",
  "Blaze",
  "Code",
  "Forge",
  "Pixel",
  "Craft",
  "Logic",
  "Sharp",
  "Mesh",
  "Numbers",
];
const TOTAL_ROUNDS = 10;
const ROUND_DURATION = 3000;

const SCREEN = { SETUP: "SETUP", GAME: "GAME", RESULT: "RESULT" };

export default function KeystrokeReflexEngine() {
  const [screen, setScreen] = useState(SCREEN.SETUP);
  const [wordInput, setWordInput] = useState(DEFAULT_WORDS.join(", "));
  const [words, setWords] = useState(DEFAULT_WORDS);
  const [wordError, setWordError] = useState("");

  // Game state
  const [round, setRound] = useState(0);
  const [currentChar, setCurrentChar] = useState("");
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [missed, setMissed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3);
  const [feedback, setFeedback] = useState(null); // "correct" | "wrong" | "missed"
  const [roundHistory, setRoundHistory] = useState([]);
  const [animKey, setAnimKey] = useState(0);

  const timerRef = useRef(null);
  const countdownRef = useRef(null);
  const hasKeyRef = useRef(false);

  // Parse word list
  const parseWords = useCallback((input) => {
    const parsed = input
      .split(/[\s,]+/)
      .map((w) => w.trim())
      .filter((w) => w.length > 0);
    return [...new Set(parsed)];
  }, []);

  // Reset key listener for each new round after it renders
  useEffect(() => {
    if (screen === SCREEN.GAME) {
      hasKeyRef.current = false;
    }
  }, [round, screen]);

  // Initialize and run the round
  const beginRound = useCallback((roundIndex, w, prevChar = null) => {
    clearInterval(timerRef.current);
    clearInterval(countdownRef.current);

    let char = randomCharFromWords(w);
    let attempts = 0;
    while (
      prevChar &&
      char.toLowerCase() === prevChar.toLowerCase() &&
      attempts < 20
    ) {
      char = randomCharFromWords(w);
      attempts++;
    }
    setCurrentChar(char);
    setFeedback(null);
    setTimeLeft(3);
    setAnimKey((k) => k + 1);

    let elapsed = 0;
    countdownRef.current = setInterval(() => {
      elapsed += 100;
      setTimeLeft(+(3 - elapsed / 1000).toFixed(1));
    }, 100);

    timerRef.current = setTimeout(() => {
      clearInterval(countdownRef.current);
      if (!hasKeyRef.current) {
        // Round timed out (missed)
        hasKeyRef.current = true;
        setFeedback("missed");
        setScore((s) => s - 1);
        setMissed((m) => m + 1);
        setRoundHistory((h) => [
          ...h,
          { char, pressed: null, result: "missed" },
        ]);
      }
      setTimeout(() => {
        const next = roundIndex + 1;
        if (next >= TOTAL_ROUNDS) {
          setScreen(SCREEN.RESULT);
        } else {
          setRound(next);
          beginRound(next, w, char);
        }
      }, 600);
    }, ROUND_DURATION);
  }, []);

  // Game trigger
  const startGame = useCallback(
    (wordList) => {
      setScore(0);
      setCorrect(0);
      setWrong(0);
      setMissed(0);
      setRoundHistory([]);
      setRound(0);
      setScreen(SCREEN.GAME);
      beginRound(0, wordList);
    },
    [beginRound],
  );

  const handleStart = () => {
    const parsed = parseWords(wordInput);
    if (parsed.length === 0) {
      setWordError("Please enter at least one word.");
      return;
    }
    setWordError("");
    setWords(parsed);
    startGame(parsed);
  };

  // Keyboard event handler
  useEffect(() => {
    if (screen !== SCREEN.GAME) return;

    function handleKey(e) {
      if (hasKeyRef.current) return;
      if (!isPrintable(e.key)) return;
      hasKeyRef.current = true;

      clearTimeout(timerRef.current);
      clearInterval(countdownRef.current);

      const pressed = e.key;
      const target = currentChar;
      const isCorrect = pressed === target;

      setFeedback(isCorrect ? "correct" : "wrong");

      if (isCorrect) {
        setScore((s) => s + 1);
        setCorrect((c) => c + 1);
        setRoundHistory((h) => [
          ...h,
          { char: currentChar, pressed: e.key, result: "correct" },
        ]);
      } else {
        setScore((s) => s - 1);
        setWrong((w) => w + 1);
        setRoundHistory((h) => [
          ...h,
          { char: currentChar, pressed: e.key, result: "wrong" },
        ]);
      }

      setTimeout(() => {
        const next = round + 1;
        if (next >= TOTAL_ROUNDS) {
          setScreen(SCREEN.RESULT);
        } else {
          setRound(next);
          beginRound(next, words, currentChar);
        }
      }, 600);
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [screen, currentChar, round, words, beginRound]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
      clearInterval(countdownRef.current);
    };
  }, []);

  return (
    <div className="game-root">
      {screen === SCREEN.SETUP && (
        <SetupScreen
          wordInput={wordInput}
          setWordInput={setWordInput}
          wordError={wordError}
          parseWords={parseWords}
          handleStart={handleStart}
          totalRounds={TOTAL_ROUNDS}
        />
      )}

      {screen === SCREEN.GAME && (
        <GameScreen
          score={score}
          round={round}
          totalRounds={TOTAL_ROUNDS}
          timeLeft={timeLeft}
          currentChar={currentChar}
          feedback={feedback}
          animKey={animKey}
          roundHistory={roundHistory}
        />
      )}

      {screen === SCREEN.RESULT && (
        <ResultScreen
          score={score}
          correct={correct}
          wrong={wrong}
          missed={missed}
          roundHistory={roundHistory}
          handlePlayAgain={() => startGame(words)}
          handleChangeWords={() => setScreen(SCREEN.SETUP)}
        />
      )}
    </div>
  );
}
