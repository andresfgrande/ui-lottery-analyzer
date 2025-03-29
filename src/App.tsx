import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { ThemeProvider } from "./context/ThemeContext";
import NotFound from "./pages/NotFound";
import BetDetail from "./pages/BetDetail";
import NewBet from "./pages/NewBet";
import Layout from "./components/Layout";

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/bets/new" element={<NewBet />} />
          <Route path="/bets/:betId" element={<BetDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
