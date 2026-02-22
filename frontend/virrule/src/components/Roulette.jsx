function Roulette({ result }) {
  return (
    <section className="roulette-section">
      <h2>Wheel</h2>
      <p className="result-display">Result: {result ?? '—'}</p>
    </section>
  );
}

export default Roulette;