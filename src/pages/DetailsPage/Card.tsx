import classNames from "classnames";
import { ReactNode } from "react";

export function Card({
  text,
  label,
  description,
  className,
}: {
  text: string;
  label?: ReactNode;
  description: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={classNames(
        className,
        "text-heading border-current border inline-block rounded-3xl px-9 py-6"
      )}
    >
      <span className="text-body font-friends text-4xl md:text-5xl font-normal">
        {text}
      </span>
      {label && <div className="pt-3 text-2xl text-body">{label}</div>}
      {description && <div className="pt-3 text-body">{description}</div>}
    </div>
  );
}
