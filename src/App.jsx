import AddressBox from "./components/AddressBox";
import ResultCard from "./components/ResultCard";
import { useState } from "react";

function App() {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null)

  async function handleAnalyze() {
    if (!address.trim()) {
      return;
    }
    setErrorMessage(null);
    try {
      const reply = await fetch("http://localhost:3001/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: address.trim() }),
      });
      if(!reply.ok){
        setErrorMessage("The server rejected the request")
        console.log("Server said no, status:", reply.status)
        return;
      }
      const data = await reply.json();
      setResult(data);
    } catch (error) {
      setErrorMessage("Server couldnt be reached")
      console.log("could not load data", error);
    }
  }

  return (
    <div className="App">
      <h1>Sentiment Analyzer</h1>
      <AddressBox
        address={address}
        onAddressChange={setAddress}
        onAnalyze={handleAnalyze}
      />
      {errorMessage && <p className="error">{errorMessage}</p>}
      <ResultCard result={result} />
    </div>
  );
}

export default App;
