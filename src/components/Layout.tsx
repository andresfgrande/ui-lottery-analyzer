import ToggleButton from "./ToggleButton";
import "../styles/dashboard.css";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h2 className="header-logo">Lttery Analyzer</h2>
        <ToggleButton />
      </header>
      {children}
    </div>
  );
}
