import { Zone } from "@/lib/zone";

interface ZoneCellProps {
  zone: Zone;
  onClick: () => void;
  isHighlighted?: boolean;
}

export function ZoneCell({
  zone,
  onClick,
  isHighlighted = false,
}: ZoneCellProps) {
  const getZoneColor = () => {
    switch (zone.type) {
      case "Оперативная":
        return "bg-slate-300 hover:bg-slate-400 border-slate-400";
      case "KZ":
        return "bg-sky-400 hover:bg-sky-500 border-blue-500";
      case "UZ":
        return "bg-emerald-300 hover:bg-emerald-400 border-emerald-500";
      case "Прочее":
        return "bg-amber-300 hover:bg-amber-400 border-amber-500";
      case "Недоступно":
        return "bg-red-300 border-red-500";
      default:
        return "bg-slate-300 hover:bg-slate-400 border-slate-400";
    }
  };

  const occupancyPercentage = (zone.occupancy / 3) * 100;

  const isDisabled = zone.type === "Недоступно";

  return (
    <button
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      className={`min-w-8 w-11 h-11 rounded-sm ${getZoneColor()} text-muted-foreground font-semibold transition-all flex flex-col items-center justify-center relative group border ${
        isHighlighted
          ? "z-20 scale-125 animate-pulse-glow"
          : "hover:shadow-md hover:scale-105"
      }`}
      style={
        isHighlighted
          ? {
              boxShadow:
                "0 0 0 4px rgba(59, 130, 246, 0.5), 0 0 20px 8px rgba(59, 130, 246, 0.4), 0 0 40px 16px rgba(59, 130, 246, 0.2)",
            }
          : undefined
      }
    >
      <span className="text-[10px] leading-tight">{zone.id}</span>

      <span className="text-[9px] leading-tight mt-0.5 opacity-90">
        {zone.occupancy}/3
      </span>

      {/* индикатор загруженности */}
      <div className="absolute bottom-1 left-1 right-1 h-0.5 bg-black/20 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all ${
            zone.type === "Оперативная" ? "bg-slate-600" : "bg-white"
          }`}
          style={{ width: `${occupancyPercentage}%` }}
        ></div>
      </div>

      {/* при наведении инфа */}
      {!isHighlighted && !isDisabled && (
        <div className="absolute bottom-full mb-2 hidden group-hover:block bg-popover text-popover-foreground text-xs px-2 py-1 rounded-md shadow-md whitespace-nowrap z-10 border">
          {zone.type.toUpperCase()} {zone.occupancy}/3
        </div>
      )}

      {/* анимация при наведении */}
      {isHighlighted && !isDisabled && (
        <div className="absolute inset-0 rounded-sm border-2 border-blue-400 animate-ping opacity-75"></div>
      )}
    </button>
  );
}
