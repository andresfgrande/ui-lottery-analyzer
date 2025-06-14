import ToggleButton from "./ToggleButton";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const navigate = useNavigate();
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h2
          className="header-logo"
          onClick={() => navigate('/')}
        >
          Lottery Analyzer
        </h2>
        <ToggleButton />
      </header>
      {children}
    </div>
  );
}
