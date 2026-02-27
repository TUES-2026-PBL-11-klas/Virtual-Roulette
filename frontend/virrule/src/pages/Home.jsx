import { useEffect, useState } from "react";
import Roulette from "../components/Roulette";
import "../styles/Home.css";
import chips from "../components/chips.jsx";
import Stats from "../components/stats.jsx";
import Comments from "../components/Comments";
import Information from "../components/Information.jsx";
import BettingTable from "../components/bettingTable.jsx";

function Home() {
  const [selectedChip, setSelectedChip] = useState(chips[0]);
  const [bets, setBets] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [isSpinModalOpen, setIsSpinModalOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState(null);
  const [spinColor, setSpinColor] = useState(null);
  const [totalSpins, setTotalSpins] = useState(0);
  const [totalLoss, setTotalLoss] = useState(0);
  const [totalWager, setTotalWager] = useState(0);

  const handleAddChipsClick = () => {
    setShowComments((prev) => !prev);
  };

  const handleChipClick = (chip) => {
    setSelectedChip(chip);
  };

  const handlePlaceBet = (spot, chip) => {
    const chipToUse = chip || selectedChip;
    if (!chipToUse || !spot) return;

    setBets((prev) => [
      ...prev,
      {
        id: `${spot.id}-${Date.now()}-${prev.length}`,
        spotId: spot.id,
        label: spot.label,
        type: spot.type,
        numbers: spot.numbers,
        amount: chipToUse.value,
        chipColor: chipToUse.color,
      },
    ]);
  };

  const handleClearBets = () => {
    setBets([]);
    setSpinResult(null);
    setSpinColor(null);
  };

  const totalStake = bets.reduce((sum, bet) => sum + bet.amount, 0);

  const computeLossForResult = (resultNumber) => {
    if (bets.length === 0) return 0;
    let loss = 0;
    for (const bet of bets) {
      const hit = bet.numbers?.includes(resultNumber);
      if (!hit) {
        loss += bet.amount;
      }
    }
    return loss;
  };

  const handleBetConfirm = async () => {
    if (!bets.length) {
      alert("Place at least one bet on the table first.");
      return;
    }

    setIsSpinModalOpen(true);
    setIsSpinning(true);
    setSpinResult(null);
    setSpinColor(null);

    try {
      const response = await fetch("/api/game/spin");
      if (!response.ok) {
        throw new Error("Failed to spin wheel");
      }
      const data = await response.json();
      setSpinResult(data.number);
      setSpinColor(data.color);
      const lossThisSpin = computeLossForResult(data.number);
      setTotalLoss((prev) => prev + lossThisSpin);
      setTotalSpins((prev) => prev + 1);
      setTotalWager((prev) => prev + totalStake);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSpinning(false);
    }
  };

  const closeSpinModal = () => {
    setIsSpinModalOpen(false);
  };

  const handleSimulateSpins = (count) => {
    if (!bets.length) {
      alert("Place at least one bet on the table first.");
      return;
    }

    let aggregateLoss = 0;
    for (let i = 0; i < count; i += 1) {
      const outcome = Math.floor(Math.random() * 37);
      aggregateLoss += computeLossForResult(outcome);
    }
    setTotalLoss((prev) => prev + aggregateLoss);
    setTotalSpins((prev) => prev + count);
    setTotalWager((prev) => prev + totalStake * count);
  };

  return (
    <div className="home-wrapper">
      <button className="add-chips-button" onClick={handleAddChipsClick}>
        <span className="add-chips-plus">+</span>
        <span className="add-chips-text">Add Chips</span>
      </button>

      <header className="home-header">
        <h1>Virtual Roulette</h1>
        <p>Place your bets</p>
      </header>

      <main className="home-content">
        <div className="chips-container">
          {chips.map((chip) => (
            <div
              key={chip.id}
              className={`chip ${chip.color}${
                selectedChip?.id === chip.id ? " chip--selected" : ""
              }`}
              onClick={() => handleChipClick(chip)}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData(
                  "application/x-roulette-chip",
                  JSON.stringify(chip)
                );
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleChipClick(chip)}
            >
              {chip.value}
            </div>
          ))}
        </div>

        <div className="pile-section">
          <div className="pile-label">Your bet</div>
          <div
            className="chip-pile"
            style={{
              minWidth: bets.length ? 56 + bets.length * 12 : 56,
            }}
          >
            {bets.map((bet, i) => (
              <div
                key={bet.id}
                className={`chip-in-pile chip ${bet.chipColor}`}
                style={{ zIndex: i, left: 8 + i * 12 }}
              >
                {bet.amount}
              </div>
            ))}
          </div>
          <div className="pile-total">{totalStake > 0 ? totalStake : "—"}</div>
        </div>

        <BettingTable
          onPlaceBet={handlePlaceBet}
          selectedChip={selectedChip}
          bets={bets}
        />

        <div className="bet-actions">
          <button className="bet-btn" onClick={handleBetConfirm} disabled={isSpinning}>
            {isSpinning ? "Spinning..." : "Bet"}
          </button>
          <button className="clear-btn" onClick={handleClearBets} disabled={isSpinning}>
            Clear
          </button>
        </div>

        <div className="simulation-actions">
          <span className="simulation-label">Simulate:</span>
          <button
            className="sim-btn"
            type="button"
            onClick={() => handleSimulateSpins(100)}
            disabled={isSpinning}
          >
            100
          </button>
          <button
            className="sim-btn"
            type="button"
            onClick={() => handleSimulateSpins(1000)}
            disabled={isSpinning}
          >
            1,000
          </button>
          <button
            className="sim-btn"
            type="button"
            onClick={() => handleSimulateSpins(10000)}
            disabled={isSpinning}
          >
            10,000
          </button>
          <div className="loss-summary">
            <span className="loss-label">Total spins:</span>
            <span className="loss-value">{totalSpins}</span>
            <span className="loss-label">Total sum:</span>
            <span className="loss-value">
              {totalWager.toFixed(2)}
            </span>
            <span className="loss-label">Total loss:</span>
            <span className="loss-amount">
              -{totalLoss.toFixed(2)}
            </span>
          </div>
        </div>

        <Stats spins={10} />
        <Information />
      </main>

      <Roulette
        isOpen={isSpinModalOpen}
        isSpinning={isSpinning}
        result={spinResult}
        color={spinColor}
        totalSpins={totalSpins}
        totalLoss={totalLoss}
        totalWager={totalWager}
        onClose={closeSpinModal}
      />

      {showComments && <Comments />}
    </div>
  );
}

export default Home;
