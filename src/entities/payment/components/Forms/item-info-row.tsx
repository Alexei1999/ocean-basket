import classNames from "classnames";

interface ItemInfoRowProps {
  title: string;
  value: string;
  className?: string;
  keyClassName?: string;
}
export const ItemInfoRow: React.FC<ItemInfoRowProps> = ({
  title,
  value,
  className = "text-body text-sm",
  keyClassName,
}) => (
  <div className={classNames("flex justify-between", className)}>
    <p className={keyClassName}>{title}</p>
    <span>{value}</span>
  </div>
);
