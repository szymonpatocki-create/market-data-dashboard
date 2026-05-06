import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { fetchMarketData, fetchSymbols } from "./api";
import "./App.css";

import aaplLogo from "./assets/logos/AAPL.png";
import msftLogo from "./assets/logos/MSFT.png";
import googLogo from "./assets/logos/GOOG.png";
import tslaLogo from "./assets/logos/TSLA.png";
import hsbcLogo from "./assets/logos/HSBC.png";

const companyLogos = {
  AAPL: aaplLogo,
  MSFT: msftLogo,
  GOOG: googLogo,
  TSLA: tslaLogo,
  HSBC: hsbcLogo,
};

function formatUsd(value) {
  return `$${value}`;
}

function App() {
  const [symbols, setSymbols] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState("AAPL");
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSymbols()
      .then((data) => setSymbols(data.symbols))
      .catch((error) => setError(error.message));
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchMarketData(selectedSymbol)
      .then((data) => {
        setMarketData(data);
      })
      .catch((error) => {
        setError(error.message);
        setMarketData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedSymbol]);

  return (
  <main className="dashboard">
    <header className="header">
      <h1>Market Data Dashboard</h1>
      <p>Simple dashboard for visualizing mock market data from a Python REST API.</p>
    </header>

    <section className="controls">
      <label>
        Select company:
        <select
          value={selectedSymbol}
          onChange={(event) => setSelectedSymbol(event.target.value)}
        >
          {symbols.map((symbol) => (
            <option key={symbol} value={symbol}>
              {symbol}
            </option>
          ))}
        </select>
      </label>
    </section>

    {loading && <p>Loading market data...</p>}

    {error && <p className="error">Error: {error}</p>}

    {marketData && !loading && (
      <section>
        <div className="symbol-header">
          <img
            src={companyLogos[marketData.symbol]}
            alt={`${marketData.symbol} logo`}
            className="company-logo"
          />
          <h2>{marketData.symbol}</h2>
        </div>

        <div className="stats-grid">
          <StatCard title="Latest Price" value={formatUsd(marketData.statistics.latest_price)} />
          <StatCard title="Average Price" value={formatUsd(marketData.statistics.average_price)} />
          <StatCard title="Min Price" value={formatUsd(marketData.statistics.min_price)} />
          <StatCard title="Max Price" value={formatUsd(marketData.statistics.max_price)} />
          <StatCard
            title="Return"
            value={`${marketData.statistics.return_percent}%`}
            variant={marketData.statistics.return_percent >= 0 ? "positive" : "negative"}
          />
        </div>

        <div className="chart-container">
          <h3>Price chart</h3>

          <LineChart width={850} height={300} data={marketData.prices}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
            <Line type="monotone" dataKey="price" />
          </LineChart>
        </div>

        <h3>Price data</h3>

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {marketData.prices.map((item) => (
              <tr key={item.date}>
                <td>{item.date}</td>
                <td>{formatUsd(item.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    )}
  </main>
);
}

function StatCard({ title, value, variant = "" }) {
  return (
    <div className={`stat-card ${variant}`}>
      <p>{title}</p>
      <h3>{value}</h3>
    </div>
  );
}

export default App;