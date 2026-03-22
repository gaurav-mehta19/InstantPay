interface ProfileProps {
  name: string;
  phone: string;
}

export const Profile = ({ name, phone }: ProfileProps) => {
  return (
    <div className="section-grid lg:grid-cols-[2fr_1fr]">
      <div className="panel-strong">
        <h2 className="panel-title">Personal Information</h2>
        <p className="panel-subtitle">Basic account details for your wallet.</p>

        <div className="mt-6 space-y-3">
          <div className="simple-list-item">
            <span className="text-sm text-muted">Full Name</span>
            <span className="text-sm font-semibold text-neutral-900">
              {name}
            </span>
          </div>
          <div className="simple-list-item">
            <span className="text-sm text-muted">Phone Number</span>
            <span className="text-sm font-semibold text-neutral-900">
              {phone}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="panel text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full gradient-primary text-xl font-semibold text-white">
            {name.charAt(0).toUpperCase()}
          </div>
          <h3 className="mt-3 text-lg font-semibold text-neutral-900">
            {name}
          </h3>
          <p className="text-sm text-muted">Verified Account</p>
        </div>

        <div className="panel">
          <h3 className="text-base font-semibold text-neutral-900">
            Account Status
          </h3>
          <div className="mt-3 simple-list-item">
            <span className="text-sm text-muted">State</span>
            <span className="muted-chip">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
