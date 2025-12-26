import { X } from 'lucide-react';
import { Zone } from '@/lib/zone';

interface ZoneModalProps {
  zone: Zone;
  onClose: () => void;
}

export function ZoneModal({ zone, onClose }: ZoneModalProps) {
  const getZoneColorClass = () => {
    switch (zone.type) {
      case 'Оперативная':
        return 'bg-slate-300';
      case 'KZ':
        return 'bg-sky-500';
      case 'UZ':
        return 'bg-emerald-400';
      case 'Прочее':
        return 'bg-amber-500';
      case 'Недоступно':
        return 'bg-red-400';
      default:
        return 'bg-slate-300';
    }
  };

  const getZoneTypeName = () => {
    switch (zone.type) {
      case 'Оперативная':
        return 'Оперативная';
      case 'KZ':
        return 'KZ';
      case 'UZ':
        return 'UZ';
      case 'Прочее':
        return 'Прочее';
      case 'Недоступно':
        return 'Недоступно';
      default:
        return 'Неизвестно';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-card text-card-foreground rounded-lg shadow-xl border max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <div className="flex items-center gap-3">
            <h3 className="text-foreground">Зона {zone.id}</h3>
            <span className={`px-2 py-0.5 rounded text-xs ${getZoneColorClass()} ${zone.type === 'Оперативная' ? 'text-slate-700' : 'text-white'}`}>
              {getZoneTypeName()}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors rounded-sm hover:bg-accent p-1"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-4">
          <div className="bg-muted/20 rounded-md p-4 border">
            <div className="flex justify-center items-end h-64">
              <div className="flex flex-col-reverse gap-1.5">
                {[0, 1, 2].map((level) => {
                  const container = zone.containers[level];
                  return (
                    <div
                      key={level}
                      className={`w-52 h-16 rounded-md border flex items-center justify-center transition-all ${
                        container
                          ? `${getZoneColorClass()} ${zone.type === 'Оперативная' ? 'text-slate-700' : 'text-white'} shadow-sm`
                          : 'bg-background/50 border-dashed border-muted-foreground/30 text-muted-foreground'
                      }`}
                    >
                      {container ? (
                        <div className="text-center px-2">
                          <div className="text-xs truncate">{container}</div>
                        </div>
                      ) : (
                        <span className="text-xs">—</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="mt-3 text-center">
            <span className="text-xs text-muted-foreground">
              Загруженность: {zone.occupancy} из 3
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}   