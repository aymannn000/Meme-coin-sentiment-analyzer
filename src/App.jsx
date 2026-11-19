import AddressBox from "./components/AddressBox";
import ResultCard from "./components/ResultCard";
import { useState } from "react";
import evidence from "./data/Evidence";

function App() {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState(null);
  function handleAnalyze() {
    if (!address.trim()) {
      return;
    }
    console.log("Evidence:", evidence);
    setResult({
      verdict: "Avoid",
      riskLevel: "High risk",
      horizon: "None",
      reason: "Dev wallet holds 31% of the supply and liquidity is not locked.",
    });
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
