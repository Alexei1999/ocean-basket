import classNames from "classnames";

export const ArrowLeft = ({
  className,
  ...props
}: { className?: string } & React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      className={classNames(
        className,
        "text-white hover:text-accent cursor-pointer select-none"
      )}
      height="12"
      viewBox="0 0 34 12"
      fill="none"
      {...props}
    >
      <path
        d="M33 1H1L11 11"
        color="inherit"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
