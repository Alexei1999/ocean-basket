import classNames from "classnames";

interface ScheduleProps {
  schedule: any;
  checked: boolean;
}
const ScheduleCard: React.FC<ScheduleProps> = ({ checked, schedule }) => (
  <div
    className={classNames(
      "min-h-[110px] relative py-5 px-4 rounded-xl border cursor-pointer group text-body hover:border-current",
      {
        "border-current shadow-sm": checked,
        "bg-gray-100 border-transparent": !checked,
      }
    )}
  >
    <span className="text-base text-body font-bold block mb-2">
      {schedule.title}
    </span>
    <span className="text-sm block text-gray-500">{schedule.description}</span>
  </div>
);

export default ScheduleCard;
