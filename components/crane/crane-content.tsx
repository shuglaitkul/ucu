"use client";
import { useState } from 'react';
import { CraneZones } from './components/crane-zones';

export function CraneContent() {
  const [selectedBlock, setSelectedBlock] = useState<1 | 2 | 3>(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [highlightedZone, setHighlightedZone] = useState<string | null>(null);

  const blockConfigs = {
    1: { rows: 10, cols: 16},
    2: { rows: 10, cols: 24 },
    3: { rows: 10, cols: 24 },
  };
  
  const config = blockConfigs[selectedBlock];
  let colOffset = 0;
  for (let b = 1; b < selectedBlock; b++) {
    // @ts-ignore
    colOffset += blockConfigs[b].cols || 0;
  }
  const totalColsAll = Object.values(blockConfigs).reduce((s, c) => s + c.cols, 0);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="border-b bg-card px-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-8">
            {[1, 2, 3].map((block) => (
              <button
                key={block}
                onClick={() => setSelectedBlock(block as 1 | 2 | 3)}
                className={`py-3 text-xs transition-colors relative ${
                  selectedBlock === block
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
              {block} - Зона работы
                {selectedBlock === block && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                )}
              </button>
            ))}
          </div>
          <div className="flex gap-4 items-center py-2">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-slate-300 rounded-sm"></div>
              <span className="text-xs text-muted-foreground">Оперативная зона</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-sky-500 rounded-sm"></div>
              <span className="text-xs text-muted-foreground">KZ</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-emerald-400 rounded-sm"></div>
              <span className="text-xs text-muted-foreground">UZ</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-amber-500 rounded-sm"></div>
              <span className="text-xs text-muted-foreground">Прочее</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-red-400 rounded-sm"></div>
              <span className="text-xs text-muted-foreground">Недоступно</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto scrollbar">
        <CraneZones
          rows={config.rows}
          cols={config.cols}
          blockNumber={selectedBlock}
          colOffset={colOffset}
          totalCols={totalColsAll}
          highlightedZone={highlightedZone}
        />
      </div>
    </div>
  );
}