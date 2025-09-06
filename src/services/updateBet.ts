import { UpdateBetRequest } from "../types/UpdateBetRequest";

export default async function updateBet(
  updateBetRequest: UpdateBetRequest
): Promise<boolean> {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { betId, previousResults } = updateBetRequest;
  try {
    const response = await fetch(`${apiUrl}/bets/${betId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        previousResults,
      }),
    });
    if (!response.ok) {
      console.error("Failed to update Bet", response);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error updating Bet: ", error);
    return false;
  }
}
