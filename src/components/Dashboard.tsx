import ToggleButton from "./ToggleButton";
import UserList from "./UserList";
import "../styles/dashboard.css";
import { Bet } from "../types/Bet";
import { useEffect, useState } from "react";
import getBet from "../services/getBet";

export default function Dashboard() {
  const [bet, setBet] = useState<Bet | undefined>(undefined);

  useEffect(() => {
    const getBetData = async () => {
      const betData = await getBet("7d6c5551-e679-4560-801c-aef507c81de4");
      if (!betData) {
        setBet(undefined);
        return;
      }
      setBet(betData);
    };
    getBetData();
  }, []);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <ToggleButton></ToggleButton>
      </header>
      {bet ? <p>{bet.creationDate}</p> : <p>"Loading..."</p>}
      <UserList></UserList>
    </div>
  );
}
