import { useState, useEffect } from "react";
import "../styles/newBet.css";
export default function NewBet() {
  const [previousResults, setPreviousResults] = useState<string[]>([]);
  const [newPreviousResult, setNewPreviousResult] = useState("");

  const addPreviousResult = () => {
    const newPreviousResultTrimmed = newPreviousResult.trim();
    if (newPreviousResultTrimmed) {
      setPreviousResults((prev) => [...prev, newPreviousResult]);
      setNewPreviousResult("");
    }
  };

  //TODO check previous result: 5 digits, only numbers, no duplicates
  return (
    <>
      <h1 className="dashboard-title">Nuevo analisis de apuestas</h1>
      <div className="bet-container">
        <div className="bet-details-card">
          <div className="sub-container">
            <h2>Resultados previos</h2>
            <div className="previous-results">
              <h3>{previousResults.length}</h3>
              <div className="results-grid">
                {previousResults.map((result, index) => (
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
