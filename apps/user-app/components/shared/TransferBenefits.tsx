export function TransferBenefits() {
  return (
    <div className="panel h-full">
      <h3 className="panel-title">Transfer Details</h3>
      <p className="panel-subtitle">
        Fast, reliable, and secured with end-to-end encryption.
      </p>

      <div className="mt-6 space-y-3">
        <div className="simple-list-item">
          <span className="text-sm text-muted">Processing speed</span>
          <span className="muted-chip">Instant</span>
        </div>
        <div className="simple-list-item">
          <span className="text-sm text-muted">Transfer fee</span>
          <span className="muted-chip">₹0</span>
        </div>
        <div className="simple-list-item">
          <span className="text-sm text-muted">Availability</span>
          <span className="muted-chip">24/7</span>
        </div>
      </div>
    </div>
  );
}
