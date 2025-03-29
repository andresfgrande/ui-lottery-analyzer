import ToggleButton from "../components/ToggleButton";
import BetList from "../components/BetList";
import "../styles/dashboard.css";

export default function Dashboard() {
  return (
    <>
      <h1 className="dashboard-title">Apuestas</h1>
      <BetList></BetList>
    </>
  );
}
