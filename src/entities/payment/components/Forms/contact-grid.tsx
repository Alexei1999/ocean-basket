import { PlusIcon } from "@entities/dishes/components/Counter/PlusIcon";
import { useEffect, useState } from "react";
import AddOrUpdateCheckoutContact from "./add-or-update";
import ContactCard from "./contact-card";
import Modal from "./modal";

interface ContactProps {
  contact: string | undefined;
  label: string;
  count?: number;
  className?: string;
}

const ContactGrid = ({ contact, label, count, className }: ContactProps) => {
  const [contactNumber, setContactNumber] = ["213123123123", () => {}] as any;
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (contact) {
      setContactNumber(contact);
    }
  }, [contact, setContactNumber]);

  function onAddOrChange() {
    setIsModalOpen(true);
  }
  return (
    <div className={className}>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddOrUpdateCheckoutContact />
      </Modal>
      <div className="flex items-center justify-between mb-5 md:mb-8">
        <div className="flex items-center space-s-3 md:space-s-4">
          {count && (
            <span className="rounded-full w-8 h-8 bg-accent flex items-center justify-center text-base lg:text-xl text-light">
              {count}
            </span>
          )}
          <p className="text-lg lg:text-xl text-body capitalize">{label}</p>
        </div>

        <button
          className="flex items-center text-sm font-semibold text-accent transition-colors duration-200 focus:outline-none focus:text-accent-hover hover:text-accent-hover"
          onClick={onAddOrChange}
        >
          <PlusIcon className="w-4 h-4 stroke-2 me-0.5" />
          {contactNumber ? "Изменить телефон" : "Добавить телефон"}
        </button>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <ContactCard
          checked={Boolean(contactNumber)}
          number={Boolean(contactNumber) ? contactNumber : "Нет телефона"}
        />
      </div>
    </div>
  );
};

export default ContactGrid;
