import { CloseIcon } from "@entities/cart/components/icons/close-icon";
import classNames from "classnames";
import { FormValues } from "./address-form";
import { onSetEditModalOpen } from "./address-grid";
import { PencilIcon } from "./pencil-icon";

function removeFalsy(obj: any) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => Boolean(v)));
}

export declare type UserAddress = {
  country?: string;
  city?: string;
  state?: string;
  zip?: string;
};

export function formatAddress(address: FormValues) {
  if (!address) return;
  const temp = [
    "city",
    "restaurant",
    "street",
    "building",
    "flat",
    "entrance",
    "floor",
  ].reduce((acc, k) => ({ ...acc, [k]: (address as any)[k] }), {});
  const formattedAddress = removeFalsy(temp);
  return Object.values(formattedAddress).join(", ");
}

interface AddressProps {
  form: FormValues;
  checked: boolean;
}
const AddressCard: React.FC<AddressProps> = ({ checked, form }) => {
  function onEdit() {
    onSetEditModalOpen(true);
  }

  return (
    <div
      className={classNames(
        "relative p-4 rounded border cursor-pointer group hover:border-current",
        {
          "text-body border-current shadow-sm": checked,
          "bg-gray-100 border-transparent": !checked,
        }
      )}
    >
      <p className="text-sm text-body font-semibold mb-3 capitalize">
        {form.title || "Адрес"}
      </p>
      <p className="text-sm text-muted">{formatAddress(form)}</p>
      <div className="absolute top-4 end-4 flex space-s-2 opacity-0 group-hover:opacity-100">
        {onEdit && (
          <button
            className="flex items-center justify-center w-5 h-5 rounded-full bg-accent text-light"
            onClick={onEdit}
          >
            <span className="sr-only">{"text-edit"}</span>
            <PencilIcon className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};

export default AddressCard;
