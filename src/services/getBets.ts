import { BetInfo, BetsInfo } from "../types/BetsInfo";

export default async function getBets(): Promise<BetInfo[] | undefined> {
  const apiUrl = import.meta.env.VITE_API_URL;
  try {
    const response = await fetch(`${apiUrl}/bets`);
    if (!response.ok) {
      console.error("Bad response", response);
      return undefined;
    }
    const data = await response.json();

    const betsInfo = data as BetsInfo;
    return betsInfo.bets;
  } catch (error) {
    console.error("Error fetching Bets: ", error);
    return undefined;
  }
}
