import Roulette from "../components/Roulette";
import "../styles/Home.css";
import chips from "../components/chips.jsx";
import stats from "../components/stats.jsx";
function Home() {
  return (
    <div>
      <h1>Welcome to the Virtual Roulette</h1>
      <Roulette />
      <div className="chips-container">
        {chips.map((chip) => (
          <div key={chip.id} className={`chip ${chip.color}`}>
            {chip.value}
          </div>
        ))}
      </div>
      <stats spins={10} />
    </div>
  );
}

export default Home;
