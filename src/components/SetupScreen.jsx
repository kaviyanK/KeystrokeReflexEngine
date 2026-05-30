import React from "react";

export default function SetupScreen({
  wordInput,
  setWordInput,
  wordError,
  parseWords,
  handleStart,
  totalRounds,
}) {
  return (
    <div className="setup-wrap fade-in">
      <div className="badge">REFLEX TEST</div>
      <h1 className="title">
        KEYSTROKE
        <br />
        <span className="title-accent">REFLEX</span>
      </h1>
      <p className="subtitle">
        A character flashes. You have <strong>3 seconds</strong> to press the
        matching key.
      </p>

      <div className="card">
        <label className="label">WORD SET</label>
        <textarea
          className="textarea"
          value={wordInput}
          onChange={(e) => setWordInput(e.target.value)}
          rows={3}
          spellCheck={false}
          placeholder="Enter words separated by commas or spaces..."
        />
        {wordError && <p className="error">{wordError}</p>}
        <div className="word-preview">
          {parseWords(wordInput).map((w) => (
            <span key={w} className="word-tag">
              {w}
            </span>
          ))}
        </div>
      </div>

      <div className="rules-row">
        <div className="rule">
          <span style={{ color: "#00ff9d" }}>+1</span> Correct
        </div>
        <div className="rule">
          <span style={{ color: "#ff4466" }}>−1</span> Wrong
        </div>
        <div className="rule">
          <span style={{ color: "#ffaa00" }}>−1</span> Missed
        </div>
      </div>

      <button className="btn-primary btn-pulse" onClick={handleStart}>
        START
      </button>

      <p className="rounds-info">{totalRounds} rounds per session</p>
    </div>
  );
}
