function AddressBox({ address, onAddressChange, onAnalyze, loading }) {
  return (
    <div className="AddressBox">
      <input
        id="Address-holder"
        type="text"
        placeholder="Enter address"
        value={address}
        onChange={(e) => onAddressChange(e.target.value)}
      />

      <button onClick={onAnalyze} disabled={loading}>
        {loading ? "Analyzing" : "Analyze"}
      </button>
    </div>
  );
}
export default AddressBox;
