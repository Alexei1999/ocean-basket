import { PlusIcon } from "@entities/dishes/components/Counter/PlusIcon";
import { capitalize } from "@shared/lib/functional-utils";

interface AddressHeaderProps {
  addLabel?: string;
  count: number | boolean;
  label: string;
  onAdd?: () => void;
}

export const AddressHeader: React.FC<AddressHeaderProps> = ({
  addLabel,
  onAdd,
  count,
  label,
}) => {
  return (
    <div className="flex items-center justify-between mb-5 md:mb-8">
      <div className="flex items-center space-s-3 md:space-s-4">
        {count && (
          <span className="rounded-full w-8 h-8 text-body bg-current flex items-center justify-center text-base lg:text-xl ">
            <span className="text-light">{count}</span>
          </span>
        )}
        <p className="text-lg lg:text-xl text-body">{capitalize(label)}</p>
      </div>
      {onAdd && (
        <button
          className="flex items-center text-body text-sm font-semibold transition-colors duration-200 focus:outline-none focus:text-accent-hover hover:text-accent-hover"
          onClick={onAdd}
        >
          <PlusIcon className="w-4 h-4 stroke-2 me-0.5" />
          {addLabel}
        </button>
      )}
    </div>
  );
};
