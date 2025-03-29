import ToggleButton from "./ToggleButton";
import BetList from "./BetList";
import "../styles/dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <ToggleButton></ToggleButton>
      </header>
      <h1 className="dashboard-title">Apuestas</h1>
      <BetList></BetList>
    </div>
  );
}
