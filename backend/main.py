from datetime import date, timedelta
from random import uniform

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Market Data Dashboard API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SUPPORTED_SYMBOLS = ["AAPL", "MSFT", "GOOG", "TSLA", "HSBC"]

BASE_PRICES = {
    "AAPL": 180,
    "MSFT": 420,
    "GOOG": 160,
    "TSLA": 250,
    "HSBC": 45,
}

@app.get("/")
def root():
    return {"message": "Market Data Dashboard API is running"}

@app.get("/api/symbols")
def get_symbols():
    return{"symbols": SUPPORTED_SYMBOLS}

@app.get("/api/market-data/{symbol}")
def get_market_data(symbol: str):
    symbol = symbol.upper()

    if symbol not in BASE_PRICES:
        raise HTTPException(status_code=404, detail="Symbol not found")
    
    prices = generate_mock_prices(symbol)
    statistics = calculate_statistics(prices)   
    
    return {
        "symbol": symbol,
        "prices": prices,
        "statistics": statistics,
    }

def calculate_statistics(prices):
    values = [item["price"] for item in prices]

    first_price = values[0]
    latest_price = values[-1]

    return_percent = round((latest_price - first_price) / first_price * 100, 2)

    return {
        "latest_price": latest_price,
        "average_price": round(sum(values) /len(values), 2),
        "min_price": min(values),
        "max_price": max(values),
        "return_percent": return_percent
    }

def generate_mock_prices(symbol: str, days: int = 30):
    current_price = BASE_PRICES[symbol]
    prices = []

    for i in range(days):
        current_price += uniform(-3, 3)
        current_price = round(max(current_price, 1), 2)

        prices.append(
            {
                "date": str(date.today() - timedelta(days = days - i)),
                "price": current_price,
            }
        )
    
    return prices