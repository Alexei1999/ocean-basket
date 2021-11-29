import classNames from "classnames";

interface ItemInfoRowProps {
  title: string;
  value: string;
  className?: string;
}
export const ItemInfoRow: React.FC<ItemInfoRowProps> = ({
  title,
  value,
  className = "text-body text-sm",
}) => (
  <div className={classNames("flex justify-between", className)}>
    <p>{title}</p>
    <span>{value}</span>
  </div>
);
