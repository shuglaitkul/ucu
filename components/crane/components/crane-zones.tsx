import { generateZoneData, Zone } from "@/lib/zone";
import React, { useState } from "react";
import { ZoneCell } from "./zone-cells";
import { ZoneModal } from "./zone-model";

interface StorageGridProps {
  rows: number;
  cols: number;
  blockNumber: number;
  colOffset?: number;
  totalCols?: number;
  highlightedZone: string | null;
}

export function CraneZones({
  rows,
  cols,
  blockNumber,
  highlightedZone,
  colOffset,
  totalCols,
}: StorageGridProps) {
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const offset = colOffset || 0;
  const tCols = totalCols || cols + offset;
  const zones = generateZoneData(rows, cols, blockNumber, offset, tCols);
  const craneRanges: Record<number, { start: number; count: number }> = {
    // 65-88
    1: { start: 65, count: 16 },
    2: { start: 81, count: 8 },
    3: { start: 0, count: 0 },
  };

  const gridTemplate = {
    gridTemplateColumns: `32px repeat(${totalCols}, minmax(32px, 1fr))`,
  };

  return (
    <>
      <div className="bg-card overflow-x relative scrollbar">
        {highlightedZone && (
          <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none transition-opacity duration-300" />
        )}

        <div className="p-4 relative">
          <div className="flex flex-col gap-1.5">
            <div className="flex gap-1.5">
              <div className="w-8 shrink-0"></div>
              {Array.from({ length: cols }, (_, colIndex) => {
                const colGlobalIndex = colIndex + offset;
                const displayNum = tCols - colGlobalIndex; // обратный отсчет
                return (
                  <React.Fragment key={colIndex}>
                    <div
                      key={colIndex}
                      className="w-11 text-center text-muted-foreground text-xs"
                    >
                      {displayNum}
                    </div>
                    {(colIndex + 1) % 8 === 0 && colIndex !== cols - 1 && (
                      <div className="w-2 shrink-0" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {Array.from({ length: rows }, (_, rowIndex) => (
              <React.Fragment key={rowIndex}>
                <div className="flex gap-1.5">
                  <div className="w-8 shrink-0 flex items-center justify-center text-muted-foreground text-xs">
                    <div className="flex flex-col items-center">
                      <div>{rowIndex + 1}</div>
                      {(rowIndex === 4 || rowIndex === 5) && (
                        <div className="text-xs font-medium text-amber-600">
                          ОП
                        </div>
                      )}
                    </div>
                  </div>
                  {Array.from({ length: cols }, (_, colIndex) => {
                    const seq = rowIndex * tCols + (colIndex + offset) + 1;
                    const zoneId = `${seq}`;
                    const zone = zones.find((z) => z.id === zoneId);
                    return (
                      <React.Fragment key={zoneId}>
                        {zone && (
                          <ZoneCell
                            zone={zone}
                            onClick={() => setSelectedZone(zone)}
                            isHighlighted={highlightedZone === zoneId}
                          />
                        )}

                        {(colIndex + 1) % 8 === 0 && colIndex !== cols - 1 && (
                          <div className="w-2 shrink-0" />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* Пространство / зона кранов */}
                {rowIndex === 4 && (
                  <div>
                    <div className="flex gap-1.5">
                      <div className="w-8 shrink-0"></div>
                      {Array.from({ length: cols }, (_, colIndex) => {
                        const colGlobalIndex = colIndex + offset;
                        {console.log("blockNumber:" + blockNumber)}
                        return (
                          <React.Fragment key={colIndex}>
                            <div
                              key={colIndex}
                              className={`w-11 text-center text-muted-foreground text-xs ${blockNumber === 3 ? "m-4" : "mt-4"}`}
                            >
                              {colGlobalIndex + 65 >=
                                craneRanges[blockNumber].start &&
                              colGlobalIndex + 65 <
                                craneRanges[blockNumber].start +
                                  craneRanges[blockNumber].count ? (
                                <div>{colGlobalIndex + 65}</div>
                              ) : null}
                            </div>
                            {(colIndex + 1) % 8 === 0 &&
                              colIndex !== cols - 1 && (
                                <div className="w-2 shrink-0" />
                              )}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {selectedZone && (
        <ZoneModal zone={selectedZone} onClose={() => setSelectedZone(null)} />
      )}
    </>
  );
}
