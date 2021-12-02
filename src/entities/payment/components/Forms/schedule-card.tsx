import classNames from "classnames";

interface ScheduleProps {
  schedule: any;
  checked: boolean;
}
const ScheduleCard: React.FC<ScheduleProps> = ({ checked, schedule }) => (
  <div
    className={classNames(
      "relative p-4 rounded border cursor-pointer group text-body hover:border-current",
      {
        "border-current shadow-sm": checked,
        "bg-gray-100 border-transparent": !checked,
      }
    )}
  >
    <span className="text-sm text-body font-semibold block mb-2">
      {schedule.title}
    </span>
    <span className="text-sm text-body block">{schedule.description}</span>
  </div>
);

export default ScheduleCard;
