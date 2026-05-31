import React from "react";

export default function ResultScreen({
  score,
  correct,
  wrong,
  missed,
  roundHistory,
  handlePlayAgain,
  handleChangeWords,
}) {
  return (
    <div className="result-wrap fade-in">
      <div className="badge">SESSION COMPLETE</div>
      <h2 className="final-score">
        <span className="score-label">FINAL SCORE</span>
        <span
          className="final-score-num"
          style={{
            color:
              score > 0
                ? "var(--accent)"
                : score < 0
                  ? "var(--wrong)"
                  : "var(--text-primary)",
          }}
        >
          {score >= 0 ? `+${score}` : score}
        </span>
      </h2>

      <div className="stats-row">
        <div className="stat-box">
          <span className="stat-num" style={{ color: "var(--accent)" }}>
            {correct}
          </span>
          <span className="stat-label">CORRECT</span>
        </div>
        <div className="stat-box">
          <span className="stat-num" style={{ color: "var(--wrong)" }}>
            {wrong}
          </span>
          <span className="stat-label">WRONG</span>
        </div>
        <div className="stat-box">
          <span className="stat-num" style={{ color: "var(--missed)" }}>
            {missed}
          </span>
          <span className="stat-label">MISSED</span>
        </div>
      </div>

      {/* Round Breakdown */}
      <div className="history-grid">
        {roundHistory.map((r, i) => {
          const cellColor =
            r.result === "correct"
              ? "var(--accent)"
              : r.result === "wrong"
                ? "var(--wrong)"
                : "var(--missed)";

          return (
            <div
              key={i}
              className="hist-cell"
              style={{
                borderColor: cellColor,
                color: cellColor,
              }}
            >
              <span className="hist-char">{r.char.toUpperCase()}</span>
              <span className="hist-result">
                {r.result === "correct"
                  ? "✓"
                  : r.result === "wrong"
                    ? `✗ ${r.pressed}`
                    : "⏱️"}
              </span>
            </div>
          );
        })}
      </div>

      <div className="btn-row">
        <button className="btn-primary btn-pulse" onClick={handlePlayAgain}>
          PLAY AGAIN
        </button>
        <button className="btn-outline" onClick={handleChangeWords}>
          CHANGE WORDS
        </button>
      </div>
    </div>
  );
}