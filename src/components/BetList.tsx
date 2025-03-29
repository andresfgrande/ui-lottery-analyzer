import { useEffect, useState } from "react";
import "../styles/userList.css";
import loadingGif from "../assets/loading.gif";
import { BetInfo } from "../types/BetsInfo";
import getBets from "../services/getBets";

export default function BetList() {
  const [bets, setBets] = useState<BetInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getBetsData = async () => {
      setLoading(true);
      const betsData = await getBets();
      if (!betsData) {
        setBets([]);
        return;
      }
      setLoading(false);
      setBets(betsData);
    };
    getBetsData();
  }, []);

  function formatDate(isoString: string): string {
    const date = new Date(isoString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
  }

  return (
    <div className="item-list-container">
      {loading ? (
        <div className="loading-gif">
          <img src={loadingGif} alt="Loading..." />
        </div>
      ) : (
        <div className="item-list">
          {bets.map((bet, index) => (
            <div className="item-card">
              <div className="item-id">{index + 1}</div>
              <div className="item-info">
                <h3 className="item-name">{bet.betId}</h3>
                <h3 className="item-subname">
                  {formatDate(bet.creationDate)}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
