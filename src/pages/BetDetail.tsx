import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Bet } from "../types/Bet";
import getBet from "../services/getBet";
import "../styles/betDetail.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import BackButton from "../components/BackButton";
import { PreviousResult, PreviousResults } from "../types/PreviousResult";

export default function BetDetail() {
  const [bet, setBet] = useState<Bet | undefined>(undefined);
  const { betId } = useParams();
  const [previousResults, setPreviousResults] = useState<PreviousResults>(
    new PreviousResults()
  );
  const [newPreviousResult, setNewPreviousResult] = useState("");
  const [editable, setEditable] = useState(false);

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
      setPreviousResults(
        PreviousResults.fromPrimitives(betData.previousResults)
      );
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

  //TODO: create edit button to modify the list
  //TODO: create save button to call the update endpoint
  const removePreviousResult = (previousResult: string) => {
    if (!editable) return;

    const resultToRemove = new PreviousResult(previousResult);
    previousResults.removePreviousResult(resultToRemove);
    setPreviousResults(
      PreviousResults.fromPrimitives(
        previousResults.getPreviousResults().previousResults
      )
    );
  };

  const addPreviousResult = () => {
    if (!editable) return;

    const newPreviousResultTrimmed = newPreviousResult.trim();
    if (newPreviousResultTrimmed) {
      previousResults.addPreviousResult(
        new PreviousResult(newPreviousResultTrimmed)
      );
      setPreviousResults(
        PreviousResults.fromPrimitives(
          previousResults.getPreviousResults().previousResults
        )
      );
      setNewPreviousResult("");
    }
  };

  const saveChanges = () => {
    console.log("Saving changes");
    changeEditableStatus();
  };

  const changeEditableStatus = () => {
    setEditable((prevEditable) => !prevEditable);
  };

  return (
    <div className="bet-container">
      <BackButton></BackButton>
      <h1 className="bet-title">Bet ID: {betId}</h1>
      <div className="bet-details-card">
        <p>
          <strong>Creation Date:</strong> {bet.creationDate}
        </p>
        <div className="sub-container">
          <h2>Resultados previos</h2>
          <div className="previous-results">
            <h3>{previousResults.getLength()}</h3>
            <div className="results-grid">
              {previousResults
                .getPreviousResults()
                .previousResults.map((result, index) => (
                  <span
                    key={index}
                    className="result-item"
                    onClick={() => removePreviousResult(result)}
                  >
                    {result}
                  </span>
                ))}
            </div>
            {!editable ? (
              <div className="edit-previous-result-form">
                <button
                  type="button"
                  className="add-button"
                  onClick={changeEditableStatus}
                >
                  Editar
                </button>
              </div>
            ) : (
              <div className="edit-form-container">
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
                    className="add-button"
                    onClick={addPreviousResult}
                    disabled={newPreviousResult.trim().length !== 5}
                  >
                    Añadir
                  </button>
                </div>
                <div className="create-button-container">
                  <button
                    type="button"
                    className="create-button"
                    onClick={saveChanges}
                  >
                    {" "}
                    Guardar cambios
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="sub-container">
          <h2>Parejas de números</h2>
          <div className="bet-numbers">
            {bet.betNumbers.betNumberPairs.map((pair, index) => (
              <div key={index}>
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
