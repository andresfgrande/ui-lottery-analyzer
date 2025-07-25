import { useState, useEffect } from "react";
import "../styles/newBet.css";
import { PreviousResults, PreviousResult } from "../types/PreviousResult";
import createBet from "../services/createBet.ts";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton.tsx";

export default function NewBet() {
  const [previousResults, setPreviousResults] = useState<PreviousResults>(
    new PreviousResults()
  );
  const [newPreviousResult, setNewPreviousResult] = useState("");
  const navigate = useNavigate();

  const addPreviousResult = () => {
    const newPreviousResultTrimmed = newPreviousResult.trim();
    if (newPreviousResultTrimmed) {
      previousResults.addPreviousResult(
        new PreviousResult(newPreviousResultTrimmed)
      );
      setPreviousResults(
        new PreviousResults(
          previousResults
            .getPreviousResults()
            .previousResults.map((pr) => new PreviousResult(pr))
        )
      );
      setNewPreviousResult("");
    }
  };

  const removePreviousResult = (previousResult: string) => {
    const resultToRemove = new PreviousResult(previousResult);
    previousResults.removePreviousResult(resultToRemove);
    setPreviousResults(
      new PreviousResults(
        previousResults
          .getPreviousResults()
          .previousResults.map((pr) => new PreviousResult(pr))
      )
    );
  };

  const createBetAnalysis = async () => {
    if (previousResults.getLength() === 0) {
      alert("Debe añadir al menos un resultado previo.");
      return;
    }
    const createBetRequest = {
      previousResults: previousResults.getPreviousResults().previousResults,
      generateBet: true,
    };
    const response = await createBet(createBetRequest);
    if (response) {
     navigate(`/bets/${response.betId}`);
    }
  };

  return (
    <>
      <h1 className="dashboard-title">Nuevo analisis de apuestas</h1>
      <div className="bet-container">
        <BackButton></BackButton>
        <div className="bet-details-card">
          <div className="sub-container">
            <h2>Resultados previos</h2>
            <div className="previous-results">
              <h3>{previousResults.getLength()}</h3>
              <div className="results-grid">
                {previousResults
                  .getPreviousResults()
                  .previousResults.map((result, index) => (
                    <span
                      onClick={() => removePreviousResult(result)}
                      key={index}
                      className="result-item"
                    >
                      {result}
                    </span>
                  ))}
              </div>
            </div>
            <div className="add-previous-result-form">
              <input
                type="number"
                value={newPreviousResult}
                onChange={(e) => setNewPreviousResult(e.target.value)}
                placeholder="Añadir resultado previo"
                className="add-input"
                max={9999}
              />
              <button
                type="button"
                onClick={addPreviousResult}
                className="add-button"
                disabled={newPreviousResult.trim().length !== 5}
              >
                Añadir
              </button>
            </div>
          </div>
          <div className="create-button-container">
            <button
              type="button"
              className="create-button"
              onClick={createBetAnalysis}
            >
              {" "}
              Crear análisis
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
