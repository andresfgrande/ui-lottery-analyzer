import ToggleButton from "./ToggleButton";
import "../styles/dashboard.css";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <ToggleButton />
      </header>
      {children}
    </div>
  );
}
