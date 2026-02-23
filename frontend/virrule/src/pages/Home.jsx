import { useState } from "react";
import Roulette from "../components/Roulette";
import "../styles/Home.css";
import chips from "../components/chips.jsx";
import Stats from "../components/stats.jsx";

function Home() {
  const [pile, setPile] = useState([]);

  const addToPile = (chip) => {
    if (pile.length >= 67) {
    alert("Too many chips in the pile! Please clear it before adding more.");
    return;
  }
    setPile((prev) => [...prev, { id: `${chip.id}-${Date.now()}-${prev.length}`, value: chip.value, color: chip.color }]);
  };

  const totalPile = pile.reduce((sum, c) => sum + c.value, 0);

  return (
    <div className="home-wrapper">
      <header className="home-header">
        <h1>Virtual Roulette</h1>
        <p>Place your bets</p>
      </header>
      <main className="home-content">
        <Roulette />
        <div className="chips-container">
          {chips.map((chip) => (
            <div
              key={chip.id}
              className={`chip ${chip.color}`}
              onClick={() => addToPile(chip)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && addToPile(chip)}
            >
              {chip.value}
            </div>
          ))}
        </div>
        <div className="pile-section">
          <div className="pile-label">Your bet</div>
          <div className="chip-pile" style={{ minWidth: pile.length ? 56 + pile.length * 12 : 56 }}>
            {pile.map((c, i) => (
              <div
                key={c.id}
                className={`chip-in-pile chip ${c.color}`}
                style={{ zIndex: i, left: 8 + i * 12 }}
              >
                {c.value}
              </div>
            ))}
          </div>
          <div className="pile-total">{totalPile > 0 ? totalPile : "—"}</div>
        </div>
        <div className="bet-actions">
          <button className="bet-btn">Bet</button>
          <button className="clear-btn" onClick={() => setPile([])}>Clear</button>
        </div>
        <Stats spins={10} />
      </main>
    </div>
  );
}

export default Home;
