import cn from "classnames";
import noResult from "../../../app/assets/no-result.svg";
interface Props {
  text?: string;
  className?: string;
}

export const NotFound: React.FC<Props> = ({ className, text }) => {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="h-full flex items-center justify-center">
        <img
          src={noResult}
          alt={text || "Нет данных для отображения"}
          className="w-full h-full object-contain"
        />
      </div>
      <h3 className="w-full text-center text-xl font-semibold text-body my-7">
        {text || "Нет данных для отображения"}
      </h3>
    </div>
  );
};
