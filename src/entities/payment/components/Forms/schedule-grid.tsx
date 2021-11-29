import { RadioGroup } from "@headlessui/react";
import ScheduleCard from "./schedule-card";
import { useEffect, useState } from "react";
import { AddressHeader } from "./address-header";
import { onValidateError } from "./address-grid";

interface ScheduleProps {
  label: string;
  className?: string;
  count: number;
  schedules: {
    id: number;
    title: string;
    description: string;
  }[];
}

export const ScheduleGrid: React.FC<ScheduleProps> = ({
  label,
  className,
  schedules,
  count,
}) => {
  const [selectedSchedule, setSchedule] = useState<typeof schedules[number]>();

  useEffect(() => {
    console.log("selectedSchedule", selectedSchedule);
    onValidateError([
      label,
      !selectedSchedule
        ? `Необходимо выбрать ${label?.toLowerCase()}`
        : undefined,
    ]);
  }, [selectedSchedule]);

  useEffect(() => {
    if (schedules?.length) {
      if (selectedSchedule?.id) {
        const index = schedules.findIndex(
          (a: any) => a.title === selectedSchedule.title
        );
        setSchedule(schedules[index]);
      } else {
        // setSchedule(schedules[0]);
      }
    }
  }, [
    schedules,
    schedules?.length,
    selectedSchedule?.id,
    selectedSchedule?.title,
    setSchedule,
  ]);
  return (
    <div className={className}>
      <AddressHeader count={count} label={label} />

      {schedules && schedules?.length ? (
        <RadioGroup value={selectedSchedule} onChange={setSchedule}>
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
            {"text-no-delivery-time-found"}
          </span>
        </div>
      )}
    </div>
  );
};
export default ScheduleGrid;
