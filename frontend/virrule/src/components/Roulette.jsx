function Roulette({ isOpen, isSpinning, result, color, totalSpins, totalLoss, totalWager, onClose }) {
  if (!isOpen) return null;

  const displayResult = result !== null && result !== undefined;

  const clampedSpins = Math.min(totalSpins || 0, 100);
  const desaturation = clampedSpins / 100;

  const colorLabel =
    color === "RED"
      ? "Red"
      : color === "BLACK"
      ? "Black"
      : color === "GREEN"
      ? "Green"
      : null;

  return (
    <div className="roulette-modal-overlay">
      <div className="roulette-modal-card">
        <button className="roulette-modal-close" onClick={onClose}>
          ✕
        </button>

        <h2 className="roulette-modal-title">Spinning the Wheel</h2>

        <div className="roulette-wheel-wrapper">
          <div
            className={`roulette-wheel${
              isSpinning ? " roulette-wheel--spinning" : ""
            }`}
            style={{ filter: `grayscale(${desaturation})` }}
          >
            <div className="roulette-wheel-inner" />
            <div className="roulette-wheel-center" />
            <div className="roulette-wheel-pointer" />
          </div>
        </div>

        <div className="roulette-modal-result">
          {isSpinning && <p className="roulette-status">Spinning...</p>}

          {displayResult && !isSpinning && (
            <>
              <p className="roulette-status">Result:</p>
              <div className="roulette-result-badge">
                <span className="roulette-result-number">{result}</span>
                {colorLabel && (
                  <span
                    className={`roulette-result-color roulette-result-color--${color.toLowerCase()}`}
                  >
                    {colorLabel}
                  </span>
                )}
              </div>
            </>
          )}

          <div className="roulette-summary">
            <div className="roulette-summary-row">
              <span className="roulette-summary-label">Total spins</span>
              <span className="roulette-summary-value">{totalSpins}</span>
            </div>
            <div className="roulette-summary-row">
              <span className="roulette-summary-label">Total sum</span>
              <span className="roulette-summary-value">
                {totalWager.toFixed(2)}
              </span>
            </div>
            <div className="roulette-summary-row">
              <span className="roulette-summary-label">Total loss</span>
              <span className="roulette-summary-loss">
                -{totalLoss.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Roulette;

