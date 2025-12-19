import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DialogClose } from "@/components/ui/dialog";
import { Container } from "@/lib/containers";

export function ContainerDetails({ container }: { container: Container }) {
  const direction =
    `${container.countryFrom}` + " → " + `${container.countryTo}`;
  return (
    <div className="">
      <div className="mb-4">
        <CardTitle>Контейнер: {container.name}</CardTitle>
        <CardDescription>Информация о выбранном контейнере</CardDescription>
      </div>
      <CardContent>
        <div className="planner-details grid grid-cols-2 gap-4">
          <div>
            <h3>Направление:</h3>
            <p>{direction}</p>
          </div>
          <div>
            <h3>Тип груза:</h3>
            <p>{container.cargoType}</p>
          </div>
          <div>
            <h3>Зона хранения:</h3>
            <p>{container.zone}</p>
          </div>
          <div>
            <h3>Смена:</h3>
            <p>{container.shift}</p>
          </div>
          <div>
            <h3>Вес:</h3>
            <p>{container.weight} т</p>
          </div>
          <div>
            <h3>Загруженность:</h3>
            <p>{container.loadCapacity}%</p>
          </div>
          <div>
            <h3>Срочность:</h3>
            <p>{container.urgency}</p>
          </div>
          <div>
            <h3>Доступность оборудования:</h3>
            <p>{container.equipmentAvailable ? "Да" : "Нет"}</p>
          </div>
          <div>
            <h3>Дата прибытия:</h3>
            <p>{container.arrivalDate}</p>
          </div>
          <div>
            <h3>Дата отправления:</h3>
            <p>{container.sentDate}</p>
          </div>
        </div>
        <div className="flex flex-row my-4 justify-center">
          <h3 className="font-semibold text-sm">Статус:</h3>
          <p className="text-sm ml-1">{container.status}</p>
        </div>
      </CardContent>
      <CardFooter>
        <DialogClose asChild>
          <Button variant="outline" className="w-full">
            Закрыть
          </Button>
        </DialogClose>
      </CardFooter>
    </div>
  );
}
