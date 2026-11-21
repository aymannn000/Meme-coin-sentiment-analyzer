import AddressBox from "./components/AddressBox";
import ResultCard from "./components/ResultCard";
import { useState } from "react";

function App() {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState(null);

  async function handleAnalyze() {
    if (!address.trim()) {
      return;
    }
    const reply = await fetch("http://localhost:3001/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: address.trim() }),
    });
    const data = await reply.json();
    setResult(data);
  }
  return (
    <div className="App">
      <h1>Sentiment Analyzer</h1>
      <AddressBox
        address={address}
        onAddressChange={setAddress}
        onAnalyze={handleAnalyze}
      />
      <ResultCard result={result} />
    </div>
  );
}

export default App;
