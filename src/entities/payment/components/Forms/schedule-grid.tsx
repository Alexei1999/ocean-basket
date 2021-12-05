import { RadioGroup } from "@headlessui/react";
import ScheduleCard from "./schedule-card";
import { useEffect, useState } from "react";
import { AddressHeader } from "./address-header";
import { createEvent, createStore } from "effector";
import { getFromStorage, setToStorage } from "@features/choose-dishes/api";
import { useStore } from "effector-react";

type Schedule = {
  id: number;
  title: string;
  description: string;
};

interface ScheduleProps {
  label: string;
  className?: string;
  count: number;
}

const schedules = [
  {
    id: 0,
    title: "Экспресс доставка",
    description: "60 мин, ближайшая",
  },
  {
    id: 1,
    title: "8:00 - 11:00",
    description: "8:00 - 11:00",
  },
  {
    id: 2,
    title: "12:00 - 13:00",
    description: "12:00 - 13:00",
  },
  {
    id: 3,
    title: "13:00 - 15:00",
    description: "13:00 - 15:00",
  },
  {
    id: 4,
    title: "15:00 - 17:00",
    description: "15:00 - 17:00",
  },
  {
    id: 5,
    title: "17:00 - 20:00",
    description: "17:00 - 20:00",
  },
];

const onScheduleChange = createEvent<Schedule>();
export const $schedule = createStore<Schedule | null>(null).on(
  onScheduleChange,
  (_, payload) => payload
);

$schedule.watch((state) => setToStorage("schedule", state));

export const ScheduleGrid: React.FC<ScheduleProps> = ({
  label,
  className,
  count,
}) => {
  const selectedSchedule = useStore($schedule);

  useEffect(() => {
    if (!selectedSchedule) {
      onScheduleChange(schedules[0]);
    }
  }, [selectedSchedule]);

  return (
    <div className={className}>
      <AddressHeader label={label} count={count} isEdit={false} />

      {schedules && schedules?.length ? (
        <RadioGroup value={selectedSchedule} onChange={onScheduleChange}>
          <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {schedules?.map((schedule: any, idx: number) => (
              <RadioGroup.Option value={schedule} key={idx}>
                {({ checked }) => (
                  <ScheduleCard checked={checked} schedule={schedule} />
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <span className="relative px-5 py-6 text-base text-center bg-gray-100 rounded border border-border-200">
            {"Нет доступных расписаний"}
          </span>
        </div>
      )}
    </div>
  );
};
export default ScheduleGrid;
