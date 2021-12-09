import cn from "classnames";
import ArrowNarrowLeft from "./arrow-narrow-left";

const BackButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      className="inline-flex items-center justify-center text-accent font-semibold transition-colors hover:text-accent-hover focus:text-accent-hover focus:outline-none"
      onClick={onClick}
    >
      <ArrowNarrowLeft className={cn("w-5 h-5 me-2")} strokeWidth={1.7} />
      Назад
    </button>
  );
};

export default BackButton;
