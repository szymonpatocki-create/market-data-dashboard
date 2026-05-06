const API_BASE_URL = "http://localhost:8000";

export async function fetchSymbols() {
  const response = await fetch(`${API_BASE_URL}/api/symbols`);

  if (!response.ok) {
    throw new Error("Failed to fetch symbols");
  }

  return response.json();
}

export async function fetchMarketData(symbol) {
  const response = await fetch(`${API_BASE_URL}/api/market-data/${symbol}`);

  if (!response.ok) {
    throw new Error("Failed to fetch market data");
  }

  return response.json();
}