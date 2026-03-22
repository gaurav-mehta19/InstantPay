interface BrandLogoProps {
  compact?: boolean;
  className?: string;
}

export function BrandLogo({ compact = false, className = "" }: BrandLogoProps) {
  const logoHeightClass = compact ? "h-8" : "h-10";

  return (
    <div
      className={`inline-flex items-center ${logoHeightClass} ${className}`.trim()}
    >
      <img
        src="/instantpay-logo.svg"
        alt="InstantPay"
        className="h-full w-auto"
      />
    </div>
  );
}
