import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Bet } from "../types/Bet";
import getBet from "../services/getBet";
import "../styles/betDetail.css";

export default function BetDetail() {
  const [bet, setBet] = useState<Bet | undefined>(undefined);
  const { betId } = useParams();

  useEffect(() => {
    const getBetData = async () => {
      if (!betId) {
        setBet(undefined);
        return;
      }
      const betData = await getBet(betId);
      if (!betData) {
        setBet(undefined);
        return;
      }
      setBet(betData);
    };
    getBetData();
  }, [betId]);

  if (!bet) {
    return <div className="loading">Loading bet details...</div>;
  }

  return (
    <div className="bet-container">
      <h1 className="bet-title">Bet ID: {betId}</h1>
      <div className="bet-details-card">
        <p><strong>Creation Date:</strong> {bet.creationDate}</p>
        <div className="previous-results">
          <h3>Previous Results</h3>
          <div className="results-grid">
            {bet.previousResults.map((result, index) => (
              <span key={index} className="result-item">{result}</span>
            ))}
          </div>
        </div>
        <h3>Bet Number Pairs</h3>
        <div className="bet-numbers">
          {bet.betNumbers.betNumberPairs.map((pair, index) => (
            <div key={index} className="bet-number-grid">
              {pair.pairList.map((num, idx) => (
                <span key={idx} className="bet-number">{num}</span>
              ))}
            </div>
          ))}
        </div>
        <div className="bet-stats">
          <h3>Statistics</h3>
          {bet.stats.statsCollection.map((stat, index) => (
            <div key={index} className="stats-grid">
              {stat.numberCounts.map((count, idx) => (
                <span key={idx} className="stat-item">
                  {count.numberPair} ({count.count})
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}