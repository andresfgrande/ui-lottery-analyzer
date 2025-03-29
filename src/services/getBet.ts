import { Bet } from "../types/Bet";

export default async function getBet(betId: string): Promise<Bet | undefined> {
  const apiUrl = import.meta.env.VITE_API_URL;
  try {
    const response = await fetch(`${apiUrl}/bets/${betId}`);
    if (!response.ok) {
      console.error("Bad response", response);
      return undefined;
    }
    const data = await response.json();

    return data as Bet;
  } catch (error) {
    console.error("Error fetching Bet: ", error);
    return undefined;
  }
}


