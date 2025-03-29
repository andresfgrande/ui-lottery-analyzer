import ToggleButton from "./ToggleButton";
import UserList from "./UserList";
import "../styles/dashboard.css";
import { Bet } from "../types/Bet";
import { useEffect, useState } from "react";
import getBet from "../services/getBet";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <ToggleButton></ToggleButton>
      </header>
      <UserList></UserList>
    </div>
  );
}
