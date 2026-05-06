# Market Data Dashboard

A small full-stack market data dashboard built with a **Python FastAPI backend** and a **React frontend**.

The application displays mock market data for selected stock symbols, calculates basic statistics and visualizes price data in a simple dashboard UI.

---

## Preview

![Dashboard overview](screenshots/dashboard-overview.png)

---

## Overview

This project demonstrates a simple data-oriented full-stack application.

The **backend** exposes REST API endpoints, generates mock market data and calculates basic statistics such as latest price, average price, minimum price, maximum price and return percentage.

The **frontend** consumes the API, allows the user to select a stock symbol and displays the result using statistic cards, a line chart and a price table.

---

## Tech Stack

**Backend**
- Python
- FastAPI
- Uvicorn

**Frontend**
- React
- Vite
- JavaScript
- Recharts
- CSS

**Tools**
- Git
- GitHub
- VS Code

---

## Features

- FastAPI REST API
- Mock market data generation
- React symbol selector
- Loading and error handling
- Market statistics calculation
- Price chart with Recharts
- Historical price table
- Company logos
- Dark dashboard UI
- Conditional styling for positive and negative returns

---

## Screenshots

### Dashboard

![Dashboard overview](screenshots/dashboard-overview.png)

### FastAPI Documentation

![FastAPI docs](screenshots/api-docs.png)

### Example API Response

![Backend response](screenshots/backend-response.png)

---

## Project Structure

~~~text
market-data-dashboard/
│
├── backend/
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── assets/logos/
│   │   ├── api.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── screenshots/
│   ├── dashboard-overview.png
│   ├── api-docs.png
│   └── backend-response.png
│
├── .gitignore
└── README.md
~~~

---

## Backend

The backend is implemented in `backend/main.py`.

It provides the following endpoints:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Health check |
| GET | `/api/symbols` | Returns available symbols |
| GET | `/api/market-data/{symbol}` | Returns generated market data and statistics |

Example response from `/api/market-data/AAPL`:

~~~json
{
  "symbol": "AAPL",
  "prices": [
    {
      "date": "2026-05-01",
      "price": 181.25
    }
  ],
  "statistics": {
    "latest_price": 181.25,
    "average_price": 180.76,
    "min_price": 178.14,
    "max_price": 184.32,
    "return_percent": 1.45
  }
}
~~~

The backend also includes CORS configuration so the React frontend running on `localhost:5173` can communicate with the API running on `localhost:8000`.

---

## Frontend

The frontend is implemented mainly in:

~~~text
frontend/src/App.jsx
frontend/src/api.js
frontend/src/App.css
~~~

Main responsibilities:

- fetching symbols from the backend
- storing the selected symbol in React state
- fetching market data when the selected symbol changes
- displaying loading and error states
- rendering statistic cards, a line chart and a price table
- applying conditional styling for positive or negative returns

---

## How to Run

### Backend

~~~bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
~~~

Backend:

~~~text
http://localhost:8000
~~~

FastAPI documentation:

~~~text
http://localhost:8000/docs
~~~

---

### Frontend

Open another terminal:

~~~bash
cd frontend
npm install
npm run dev
~~~

Frontend:

~~~text
http://localhost:5173
~~~

---

## What I Learned

While building this project, I practiced:

- creating a REST API with FastAPI
- configuring CORS
- generating and processing mock data
- calculating simple market statistics
- fetching backend data from React
- managing React state with `useState` and `useEffect`
- rendering charts with Recharts
- handling loading and error states
- structuring a small full-stack project
- using Git and GitHub for version control

---

## Possible Improvements

Future improvements could include:

- real market data integration
- backend and frontend tests
- more advanced financial metrics such as volatility or maximum drawdown
- better input validation
- deployment
- database support
- user authentication

---

## Summary

This project is a small full-stack market data dashboard.

The backend is built with Python and FastAPI. It exposes REST API endpoints, generates mock market data and calculates simple statistics.

The frontend is built with React. It fetches data from the backend, allows the user to select a symbol and displays the result using statistic cards, a chart and a data table.

The goal of the project was to practice backend API development, frontend data fetching and visualization in a way that is similar to data-oriented applications used in financial technology.