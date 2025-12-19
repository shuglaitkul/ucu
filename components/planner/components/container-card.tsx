import { Card } from "@/components/ui/card";
import { Container } from "@/lib/containers";

interface ContainerCardProps {
  container: Container;
  onClick: (container: Container) => void;
}

export function ContainerCard({ container, onClick }: ContainerCardProps) {

  return (
    <Card
      onClick={() => onClick(container)}
      className={`p-3 transition-colors hover:bg-muted/50 max-h-22`
    }
    >
      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="mb-1.5 text-foreground text-sm">{container.name}</h3>
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">
              Отправление: {container.countryTo}
            </p>
            <p className="text-xs text-muted-foreground">
              Вес: {container.weight} т
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
