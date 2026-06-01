import React from "react";

type AvailabilityStatus = "available" | "unavailable" | "busy";

interface AvailabilityPricingCardProps {
  status?: AvailabilityStatus;
  serviceRadius?: string;
  basePrice?: string;
}

const statusConfig = {
  available: { label: "Available", color: "#22c55e" },
  unavailable: { label: "Unavailable", color: "#ef4444" },
  busy: { label: "Busy", color: "#f97316" },
};

export const AvailabilityPricingCard = ({
  status,
  serviceRadius,
  basePrice,
}: AvailabilityPricingCardProps) => {
  const currentStatus = status ? statusConfig[status] : null;

  return (
    <div className="rounded-xl border p-4 shadow-sm space-y-3">
      <h3 className="font-semibold text-lg">Availability & Pricing</h3>

      {currentStatus ? (
        <div className="flex items-center gap-2">
          <span
            style={{ backgroundColor: currentStatus.color }}
            className="w-3 h-3 rounded-full inline-block"
          />
          <span>{currentStatus.label}</span>
        </div>
      ) : (
        <p className="text-gray-400 text-sm">Availability not set</p>
      )}

      <p className="text-sm text-gray-600">
        Service area: {serviceRadius ?? "Not specified"}
      </p>

      <p className="text-sm font-medium">
        {basePrice ? `From ${basePrice}` : "Contact for pricing"}
      </p>
    </div>
  );
};

export default AvailabilityPricingCard;
