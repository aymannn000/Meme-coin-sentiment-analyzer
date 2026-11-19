function AddressBox({address, onAddressChange, onAnalyze}) {

  return (
    <div className="AddressBox">
      <input
        id="Address-holder"
        type="text"
        placeholder="Enter address"
        value={address}
        onChange={(e) => onAddressChange(e.target.value)}
      />

      <button onClick={onAnalyze}>Analyze</button>
    </div>
  );
}
export default AddressBox;
