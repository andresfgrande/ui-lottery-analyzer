import BetList from "../components/BetList";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();
  return (
    <>
      <h1 className="dashboard-title">Análisis de apuestas</h1>
      <BetList></BetList>
      <button className="create-button-main" onClick={()=> navigate(`bets/new`)}> Crear nuevo análisis</button>
    </>
  );
}
