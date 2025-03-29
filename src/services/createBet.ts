import CreateBetRequest from "../types/CreateBetRequest";
import { CreateBetResponse } from "../types/CreateBetResponse";

export default async function createBet(
  createBetRequest: CreateBetRequest
): Promise<CreateBetResponse | undefined> {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { previousResults, generateBet } = createBetRequest;
  try {
    const response = await fetch(`${apiUrl}/bets/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        previousResults,
        generateBet,
      }),
    });

    if (!response.ok) {
      console.error("Failed to create Bet", response);
      return undefined;
    }

    const data = await response.json();

    return data as CreateBetResponse;
  } catch (error) {
    console.error("Error creating Bet: ", error);
    return undefined;
  }
}
