import classNames from "classnames";
import PhoneInput from "react-phone-input-2";

interface PhoneNumberProps {
  data: string | null;
  checked: boolean;
}

const ContactCard: React.FC<PhoneNumberProps> = ({ checked, data: number }) => {
  if (!number) {
    return null;
  }
  return (
    <div
      className={classNames(
        "relative p-4 rounded-xl border cursor-pointer group hover:border-accent",
        {
          "border-accent shadow-sm bg-light": checked,
          "bg-gray-100 border-transparent": !checked,
        }
      )}
    >
      <PhoneInput
        specialLabel={""}
        country={"ru"}
        value={number}
        disabled
        inputClass="bg-light w-full"
        dropdownClass="focus:!ring-0 !border !border-border-base !shadow-350"
      />
    </div>
  );
};

export default ContactCard;
