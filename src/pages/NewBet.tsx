import { useState, useEffect } from "react";
import "../styles/newBet.css";
import { PreviousResults, PreviousResult } from "../types/PreviousResult";


export default function NewBet() {
  const [previousResults, setPreviousResults] = useState<PreviousResults>(
    new PreviousResults()
  );
  const [newPreviousResult, setNewPreviousResult] = useState("");

  const addPreviousResult = () => {
    const newPreviousResultTrimmed = newPreviousResult.trim();
    if (newPreviousResultTrimmed) {
      previousResults.addPreviousResult(new PreviousResult(newPreviousResultTrimmed));
      setPreviousResults(previousResults);
      setNewPreviousResult("");
    }
  };

  return (
    <>
      <h1 className="dashboard-title">Nuevo analisis de apuestas</h1>
      <div className="bet-container">
        <div className="bet-details-card">
          <div className="sub-container">
            <h2>Resultados previos</h2>
            <div className="previous-results">
              <h3>{previousResults.getLength()}</h3>
              <div className="results-grid">
                {previousResults.getPreviousResults().previousResults.map((result, index) => (
                  <span key={index} className="result-item">
                    {result}
                  </span>
                ))}
              </div>
            </div>
            <div className="add-previous-result-form">
              <input
                type="text"
                value={newPreviousResult}
                onChange={(e) => setNewPreviousResult(e.target.value)}
                placeholder="Añadir resultado previo"
                className="add-input"
              />
              <button
                type="button"
                onClick={addPreviousResult}
                className="add-button"
              >
                Añadir
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
