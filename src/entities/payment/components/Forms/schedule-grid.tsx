import { RadioGroup } from "@headlessui/react";
import ScheduleCard from "./schedule-card";
import { useEffect } from "react";
import { AddressHeader } from "./address-header";
import { createEvent, createStore } from "effector";
import { setToStorage } from "@features/choose-dishes/api";
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
    description: "90 мин, ближайшая",
  },
  {
    id: 1,
    title: "10:00 - 13:00",
    description: "10:00 - 13:00",
  },
  {
    id: 2,
    title: "13:00 - 16:00",
    description: "13:00 - 16:00",
  },
  {
    id: 3,
    title: "16:00 - 19:00",
    description: "16:00 - 19:00",
  },
  {
    id: 4,
    title: "19:00 - 22:30",
    description: "19:00 - 22:30",
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

      <div className="mt-5 md:mt-8">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {schedules && schedules?.length ? (
            schedules?.map((schedule) => (
              <ScheduleCard
                key={schedule.id}
                checked={schedule.id === selectedSchedule?.id}
                schedule={schedule}
                onClick={() => onScheduleChange(schedule)}
              />
            ))
          ) : (
            <span className="relative px-5 py-6 text-base text-center bg-gray-100 rounded border border-border-200">
              {"Нет доступных расписаний"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
export default ScheduleGrid;
