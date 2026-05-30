import React from "react";

export default function GameScreen({
  score,
  round,
  totalRounds,
  timeLeft,
  currentChar,
  feedback,
  animKey,
  roundHistory,
}) {
  const feedbackColor =
    feedback === "correct"
      ? "var(--accent)"
      : feedback === "wrong"
        ? "var(--wrong)"
        : feedback === "missed"
          ? "var(--missed)"
          : "var(--card-border)";

  const glowColor =
    feedback === "correct"
      ? "var(--accent-glow)"
      : feedback === "wrong"
        ? "var(--wrong-glow)"
        : feedback === "missed"
          ? "var(--missed-glow)"
          : "rgba(30, 37, 48, 0)";

  const timerColor =
    timeLeft < 1
      ? "var(--wrong)"
      : timeLeft < 2
        ? "var(--missed)"
        : "var(--accent)";

  const progressPct = Math.min(100, ((3 - timeLeft) / 3) * 100);

  return (
    <div className="game-wrap">
      {/* Header */}
      <div className="game-header">
        <div className="score-badge">
          <span className="score-label">SCORE</span>
          <span
            className="score-value"
            style={{
              color:
                score < 0
                  ? "var(--wrong)"
                  : score > 0
                    ? "var(--accent)"
                    : "var(--text-primary)",
            }}
          >
            {score >= 0 ? `+${score}` : score}
          </span>
        </div>
        <div className="round-badge">
          {round + 1} <span className="round-of">/ {totalRounds}</span>
        </div>
        <div className="timer-badge">
          <span className="score-label">TIME</span>
          <span className="score-value" style={{ color: timerColor }}>
            {timeLeft.toFixed(1)}s
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-track">
        <div
          className="progress-bar"
          style={{
            width: `${progressPct}%`,
            backgroundColor: timerColor,
          }}
        />
      </div>

      {/* Character Display */}
      <div className="char-wrap">
        <div
          key={animKey}
          className="char-box char-pop"
          style={{
            borderColor: feedbackColor,
            boxShadow: `0 0 60px ${glowColor}`,
          }}
        >
          <span className="char-text" style={{ color: feedbackColor }}>
            {currentChar}
          </span>
        </div>

        {feedback && (
          <div
            className="feedback-label feedback-pop"
            style={{ color: feedbackColor }}
          >
            {feedback === "correct" && "✓ CORRECT"}
            {feedback === "wrong" && "✗ WRONG"}
            {feedback === "missed" && "⏱ MISSED"}
          </div>
        )}

        {!feedback && <p className="hint">Press the matching key</p>}
      </div>

      {/* Round Dots */}
      <div className="dots">
        {Array.from({ length: totalRounds }).map((_, i) => {
          const hist = roundHistory[i];
          let color = "#333";
          if (i === round) color = "#fff";
          else if (hist) {
            color =
              hist.result === "correct"
                ? "var(--accent)"
                : hist.result === "wrong"
                  ? "var(--wrong)"
                  : "var(--missed)";
          }

          return (
            <div
              key={i}
              className="dot"
              style={{
                backgroundColor: color,
                transform: i === round ? "scale(1.4)" : "scale(1)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
