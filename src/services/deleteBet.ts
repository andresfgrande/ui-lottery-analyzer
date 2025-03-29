export default async function deleteBet(betId: string): Promise<void> {
  const apiUrl = import.meta.env.VITE_API_URL;
  try {
    const response = await fetch(`${apiUrl}/bets/${betId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.error("Failed to delete Bet", response);
    }
  } catch (error) {
    console.error("Error deleting Bet: ", error);
  }
}
