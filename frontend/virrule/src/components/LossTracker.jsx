function LossTracker({ totalLoss, totalSpins, totalWager }) {
    const getWarning = () => {
        if (totalSpins === 0) return null;
        const lossPercent = (totalLoss / totalWager) * 100;
        if (totalSpins >= 10 && lossPercent >= 70)
            return "You are losing heavily. Please stop.";
        if (totalSpins >= 5 && lossPercent >= 50)
            return "You have lost more than half your wagers.";
        if (totalSpins >= 3)
            return "Remember: the house always wins.";
        return null;
    };

    const warning = getWarning();

    return (
        <div className="loss-tracker">
            <h3>Your Losses</h3>
            <p>Total Spins: <span>{totalSpins}</span></p>
            <p>Total Wagered: <span>{totalWager.toFixed(2)}</span></p>
            <p className="loss-amount">Total Lost: <span>-{totalLoss.toFixed(2)}</span></p>
            {warning && <p className="loss-warning">{warning}</p>}
        </div>
    );
}

export default LossTracker;