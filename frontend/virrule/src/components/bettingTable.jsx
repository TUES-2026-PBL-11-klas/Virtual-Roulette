import "../styles/bettingTable.css";

const RED_NUMBERS = [
  1, 3, 5, 7, 9, 12, 14, 16, 18,
  19, 21, 23, 25, 27, 30, 32, 34, 36,
];

function BettingTable({ onPlaceBet, selectedChip, bets }) {
  const handleCellClick = (spot) => {
    if (!selectedChip) return;
    onPlaceBet?.(spot, selectedChip);
  };

  const handleDrop = (event, spot) => {
    event.preventDefault();
    const raw = event.dataTransfer.getData("application/x-roulette-chip");
    if (!raw) return;
    try {
      const chip = JSON.parse(raw);
      onPlaceBet?.(spot, chip);
    } catch {
      // ignore invalid payload
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const betsForSpot = (spotId) =>
    bets.filter((b) => b.spotId === spotId);

  const buildStraightSpot = (number) => ({
    id: `straight-${number}`,
    type: "STRAIGHT",
    label: `${number}`,
    numbers: [number],
  });

  const buildDozenSpot = (index) => {
    const start = index * 12 + 1;
    const end = start + 11;
    const numbers = [];
    for (let n = start; n <= end; n += 1) numbers.push(n);
    const labelBase = `${index + 1}st 12`;
    const label = labelBase
      .replace("2st", "2nd")
      .replace("3st", "3rd");
    return {
      id: `dozen-${index + 1}`,
      type: "DOZEN",
      label,
      numbers,
    };
  };

  const buildOutsideSpot = (key) => {
    switch (key) {
      case "low": {
        const nums = [];
        for (let n = 1; n <= 18; n += 1) nums.push(n);
        return {
          id: "low",
          type: "LOW",
          label: "1-18",
          numbers: nums,
        };
      }
      case "high": {
        const nums = [];
        for (let n = 19; n <= 36; n += 1) nums.push(n);
        return {
          id: "high",
          type: "HIGH",
          label: "19-36",
          numbers: nums,
        };
      }
      case "even": {
        const nums = [];
        for (let n = 2; n <= 36; n += 2) nums.push(n);
        return {
          id: "even",
          type: "EVEN",
          label: "Even",
          numbers: nums,
        };
      }
      case "odd": {
        const nums = [];
        for (let n = 1; n <= 35; n += 2) nums.push(n);
        return {
          id: "odd",
          type: "ODD",
          label: "Odd",
          numbers: nums,
        };
      }
      case "red":
        return {
          id: "red",
          type: "RED",
          label: "Red",
          numbers: RED_NUMBERS,
        };
      case "black": {
        const blacks = [];
        for (let n = 1; n <= 36; n += 1) {
          if (!RED_NUMBERS.includes(n)) blacks.push(n);
        }
        return {
          id: "black",
          type: "BLACK",
          label: "Black",
          numbers: blacks,
        };
      }
      default:
        return null;
    }
  };

  const buildColumnSpot = (index) => {
    const numbers = [];
    for (let n = index + 1; n <= 36; n += 3) numbers.push(n);
    return {
      id: `column-${index + 1}`,
      type: "COLUMN",
      label: "2:1",
      numbers,
    };
  };

  const zeroSpot = {
    id: "straight-0",
    type: "STRAIGHT",
    label: "0",
    numbers: [0],
  };

  // Three horizontal rows, left-to-right 1–36 in standard layout
  const rows = [
    [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
    [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],
    [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34],
  ];

  return (
    <section className="betting-table-wrapper">
      <div className="betting-table">
        <div
          className="bt-zero-col bt-cell"
          onClick={() => handleCellClick(zeroSpot)}
          onDrop={(e) => handleDrop(e, zeroSpot)}
          onDragOver={handleDragOver}
        >
          <span className="bt-zero-label">{zeroSpot.label}</span>
          {betsForSpot(zeroSpot.id).length > 0 && (
            <div className="bt-chip-stack">
              <span className="bt-chip-count">
                {betsForSpot(zeroSpot.id).length}
              </span>
            </div>
          )}
        </div>

        <div className="bt-number-section">
          <div className="bt-grid">
            {rows.map((rowNumbers, rowIndex) => (
              <div className="bt-row" key={rowIndex}>
                {rowNumbers.map((num) => {
                  const isRed = RED_NUMBERS.includes(num);
                  const spot = buildStraightSpot(num);
                  const spotBets = betsForSpot(spot.id);
                  return (
                    <div
                      key={num}
                      className={`bt-cell number-cell ${
                        isRed ? "red" : "black"
                      }${spotBets.length ? " bt-cell--active" : ""}`}
                      onClick={() => handleCellClick(spot)}
                      onDrop={(e) => handleDrop(e, spot)}
                      onDragOver={handleDragOver}
                    >
                      <span>{num}</span>
                      {spotBets.length > 0 && (
                        <div className="bt-chip-stack">
                          <span className="bt-chip-count">
                            {spotBets.length}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="bt-dozens">
            {[0, 1, 2].map((i) => {
              const spot = buildDozenSpot(i);
              const spotBets = betsForSpot(spot.id);
              return (
                <div
                  key={spot.id}
                  className={`bt-cell outside-cell${
                    spotBets.length ? " bt-cell--active" : ""
                  }`}
                  onClick={() => handleCellClick(spot)}
                  onDrop={(e) => handleDrop(e, spot)}
                  onDragOver={handleDragOver}
                >
                  {spot.label}
                  {spotBets.length > 0 && (
                    <div className="bt-chip-stack">
                      <span className="bt-chip-count">
                        {spotBets.length}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="bt-outside">
            {["low", "even", "red", "black", "odd", "high"].map((key) => {
              const spot = buildOutsideSpot(key);
              if (!spot) return null;
              const spotBets = betsForSpot(spot.id);
              const extraClass =
                key === "red"
                  ? " red-outside"
                  : key === "black"
                  ? " black-outside"
                  : "";
              return (
                <div
                  key={spot.id}
                  className={`bt-cell outside-cell${extraClass}${
                    spotBets.length ? " bt-cell--active" : ""
                  }`}
                  onClick={() => handleCellClick(spot)}
                  onDrop={(e) => handleDrop(e, spot)}
                  onDragOver={handleDragOver}
                >
                  {spot.label}
                  {spotBets.length > 0 && (
                    <div className="bt-chip-stack">
                      <span className="bt-chip-count">
                        {spotBets.length}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bt-col-bets">
          {[0, 1, 2].map((i) => {
            const spot = buildColumnSpot(i);
            const spotBets = betsForSpot(spot.id);
            return (
              <div
                key={spot.id}
                className={`bt-cell col-bet-cell${
                  spotBets.length ? " bt-cell--active" : ""
                }`}
                onClick={() => handleCellClick(spot)}
                onDrop={(e) => handleDrop(e, spot)}
                onDragOver={handleDragOver}
              >
                {spot.label}
                {spotBets.length > 0 && (
                  <div className="bt-chip-stack">
                    <span className="bt-chip-count">
                      {spotBets.length}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default BettingTable;