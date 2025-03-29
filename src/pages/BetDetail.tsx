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

  const generateGaussianData = (numberCounts) => {
    const numbers = numberCounts.map((item) => parseInt(item.numberPair));
    const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length || 0;
    const stdDev =
      Math.sqrt(
        numbers.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / numbers.length
      ) || 1;

    const gaussianData = [];
    const minX = Math.min(...numbers) - 10 || 0;
    const maxX = Math.max(...numbers) + 10 || 20;
    for (let x = minX; x <= maxX; x += 1) {
      const y =
        (1 / (stdDev * Math.sqrt(2 * Math.PI))) *
        Math.exp(-Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2)));
      gaussianData.push({ x, y });
    }
    return gaussianData;
  };

  function renderPairRepresentation(pairIndex: number) {
    if (pairIndex === 0) {
      return (
        <p>
          <strong>00</strong>000
        </p>
      );
    }

    if (pairIndex === 1) {
      return (
        <p>
          0<strong>00</strong>00
        </p>
      );
    }

    if (pairIndex === 2) {
      return (
        <p>
          00<strong>00</strong>0
        </p>
      );
    }

    if (pairIndex === 3) {
      return (
        <p>
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
          <h2>Previous Results</h2>
          <div className="previous-results">
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
          <h2>Bet Number Pairs</h2>
          <div className="bet-numbers">
            {bet.betNumbers.betNumberPairs.map((pair, index) => (
              <div>
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
              const gaussianData = generateGaussianData(stat.numberCounts);

              return (
                <div key={index} className="stats-collection-item">
                  <h4 className="stats-graphic-title">
                    Stats Collection #{index + 1} - Frequency
                  </h4>
                  <BarChart width={500} height={300} data={frequencyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="numberPair" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>

                  <h4>Stats Collection #{index + 1} - Gaussian Distribution</h4>
                  <LineChart width={500} height={300} data={gaussianData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="x" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="y"
                      stroke="#82ca9d"
                      dot={false}
                    />
                  </LineChart>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
