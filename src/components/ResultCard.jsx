function ResultCard({result}) {
  if (!result) {
    return null;
  }
  return (
    <div className="Result">
      <h2 className="verdict">{result.verdict}</h2>
      <p className="risk-level">{result.riskLevel}</p>
      <p className="horizon">{result.horizon}</p>
      <p className="reason">{result.reason}</p>
    </div>
  );
}
export default ResultCard;
