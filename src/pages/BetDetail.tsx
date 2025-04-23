import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Bet } from "../types/Bet";
import getBet from "../services/getBet";
import "../styles/betDetail.css";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

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

  function renderPairRepresentation(pairIndex: number) {
    if (pairIndex === 0) {
      return (
        <p className="pair-representation-title">
          <strong> 00</strong>000
        </p>
      );
    }

    if (pairIndex === 1) {
      return (
        <p className="pair-representation-title">
          0<strong>00</strong>00
        </p>
      );
    }

    if (pairIndex === 2) {
      return (
        <p className="pair-representation-title">
          00<strong>00</strong>0
        </p>
      );
    }

    if (pairIndex === 3) {
      return (
        <p className="pair-representation-title">
          000<strong>00</strong>
        </p>
      );
    }
  }

  return (
    <div className="bet-container">
      <h1 className="bet-title">Bet ID: {betId}</h1>
      <div className="bet-details-card">
        <p>
          <strong>Creation Date:</strong> {bet.creationDate}
        </p>
        <div className="sub-container">
          <h2>Resultados previos</h2>
          <div className="previous-results">
            <h3>{bet.previousResults.length}</h3>
            <div className="results-grid">
              {bet.previousResults.map((result, index) => (
                <span key={index} className="result-item">
                  {result}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="sub-container">
          <h2>Parejas de números</h2>
          <div className="bet-numbers">
            {bet.betNumbers.betNumberPairs.map((pair, index) => (
              <div>
                <h3>{pair.pairList.length}</h3>
                {renderPairRepresentation(index)}
                <div key={index} className="bet-number-grid">
                  {pair.pairList.map((num, idx) => (
                    <span key={idx} className="bet-number">
                      {num}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sub-container">
          <h2>Statistics</h2>
          <div className="bet-stats">
            {bet.stats.statsCollection.map((stat, index) => {
              const frequencyData = stat.numberCounts.map((count) => ({
                numberPair: count.numberPair,
                count: count.count,
              }));

              return (
                <div key={index} className="stats-collection-item">
                  {renderPairRepresentation(index)}

                  <BarChart width={500} height={300} data={frequencyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="numberPair" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </div>
              );
            })}
          </div>
        </div>

        <div className="sub-container">
          <h2>Apuestas</h2>
          <div className="bet-guesses">
            <h3>{bet.guesses.guessList.length}</h3>
            <div className="guess-grid">
              {bet.guesses.guessList.map((result, index) => (
                <span key={index} className="guess-item">
                  {result}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
