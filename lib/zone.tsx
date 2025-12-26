export type ZoneType = "Оперативная" | "KZ" | "UZ" | "Прочее" | "Недоступно";

export interface Zone {
  id: string;
  type: ZoneType;
  occupancy: number;
  containers: string[];
  percentage?: number;
}

function generateContainerId(zoneId: string, level: number): string {
  const containerName = [
    "CONT-023",
    "CONT-020",
    "CONT-043",
    "CONT-048",
    "CONT-019",
  ];
  return `${containerName}}-${level + 1}`;
}

export function generateZoneData(
  rows: number,
  cols: number,
  blockNumber: number,
  colOffset = 0,
  totalCols = cols + colOffset
): Zone[] {
  const zones: Zone[] = [];
  const MAX_OCCUPANCY = 3;
  // процентное распределение по зонам
  const DISTRIBUTION: Record<string, number> = {
    KZ: 37,
    UZ: 49,
    Прочее: 14,
  };

  const uzRows = Math.round((rows * DISTRIBUTION.UZ) / 100);
  const kzRows = Math.round((rows * DISTRIBUTION.KZ) / 100);
  const otherRows = rows - uzRows - kzRows;

  const rowsByZone = {
    UZ: Math.round(rows * 0.49),
    KZ: Math.round(rows * 0.37),
    Прочее: rows - Math.round(rows * 0.49) - Math.round(rows * 0.37), // остаток
  };

  const rowTypes: ZoneType[] = [
    ...Array(uzRows).fill("UZ"),
    ...Array(kzRows).fill("KZ"),
    ...Array(otherRows).fill("Прочее"),
  ];

  rowTypes.push(...Array(rowsByZone.UZ).fill("UZ"));
  rowTypes.push(...Array(rowsByZone.KZ).fill("KZ"));
  rowTypes.push(...Array(rowsByZone["Прочее"]).fill("Прочее"));

  for (let row = 0; row < rows; row++) {
    let rowType: ZoneType;
    // 5 - 6 ряд - оперативная
    if (row === 4 || row === 5) {
      rowType = "Оперативная";
    } else {
      rowType = rowTypes[row];
    }

    for (let col = 0; col < cols; col++) {
      const colGlobalIndex = col + colOffset;
      const seq = row * totalCols + colGlobalIndex + 1;
      const zoneId = `${seq}`;

      let type: ZoneType;

      // недоступные зоны (свх, авто)
      const globalColNum = col + colOffset + 1;
      if (blockNumber === 2 && row > 6 && col > 7) {
        type = "Недоступно";
      } else if (blockNumber === 3) {
        // правила для блока 3:
        if (row >= 7 && row <= 9 && globalColNum <= 56) {
          type = "Недоступно";
        } else if (row >= 6 && row <= 9 && col >= Math.max(0, cols - 4)) {
          type = "Недоступно";
        } else {
          type = rowType;
        }
      } else {
        type = rowType;
      }
      const occupancy = Math.floor(Math.random() * MAX_OCCUPANCY);

      const containers: string[] = [];
      for (let i = 0; i < occupancy; i++) {
        containers.push(generateContainerId(zoneId, i));
      }

      zones.push({
        id: zoneId,
        type,
        occupancy,
        containers,
        percentage:
          type === "KZ" || type === "UZ" || type === "Прочее"
            ? DISTRIBUTION[type]
            : undefined,
      });
    }
  }
  for (let col = 0; col < cols; col++) {
    const expectedCol = col + colOffset + 1;
    const allFull = zones
      .filter((z) => {
        const idNum = parseInt(z.id, 10);
        if (isNaN(idNum)) return false; // skip OP- zones
        const zeroIdx = idNum - 1;
        const zRow = Math.floor(zeroIdx / totalCols) + 1;
        const zCol = (zeroIdx % totalCols) + 1;
        return zCol === expectedCol && zRow >= 1 && zRow <= rows;
      })
      .every((z) => z.occupancy >= MAX_OCCUPANCY);
  }

  for (let col = 0; col < cols; col++) {
    const colNum = col + colOffset + 1;
    const zoneId = `OP-${colNum}`;
    const occupancy = Math.floor(Math.random() * MAX_OCCUPANCY);

    const containers: string[] = [];
    for (let i = 0; i < occupancy; i++) {
      containers.push(generateContainerId(zoneId, i));
    }

    zones.push({
      id: zoneId,
      type: "Оперативная",
      occupancy,
      containers,
    });
  }

  return zones;
}
