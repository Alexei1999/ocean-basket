import classNames from "classnames";

interface ItemInfoRowProps {
  title: string;
  value: string;
  className?: string;
  keyClassName?: string;
  valueClassName?: string;
}
export const ItemInfoRow: React.FC<ItemInfoRowProps> = ({
  title,
  value,
  className = "text-body text-sm",
  keyClassName,
  valueClassName,
}) => (
  <div className={classNames("flex justify-between", className)}>
    <p className={keyClassName}>{title}</p>
    <span className={valueClassName}>{value}</span>
  </div>
);
