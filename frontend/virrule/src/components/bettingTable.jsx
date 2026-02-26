import "../styles/bettingTable.css";

function BettingTable({ onBet }) {
    const bets = [
        { name: "1-18", type: "low" },
        { name: "19-36", type: "high" },
        { name: "Even", type: "even" },
        { name: "Odd", type: "odd" },
        { name: "Red", type: "red" },
        { name: "Black", type: "black" },
    ];

    return (
        <div className="betting-table">
            <h2>Betting Options</h2>
            <div className="betting-options">
                {bets.map((bet) => (
                    <button key={bet.type} onClick={() => onBet(bet)}>
                        {bet.name}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default BettingTable;