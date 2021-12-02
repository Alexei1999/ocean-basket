import { useState } from "react";
import { OTP } from "./otp";

const AddOrUpdateCheckoutContact = () => {
  const [contactNumber, setContactNumber] = useState("");

  function onContactUpdate(newPhoneNumber: string) {
    setContactNumber(newPhoneNumber);
  }
  return (
    <div className="p-5 sm:p-8 bg-light md:rounded-xl min-h-screen flex flex-col justify-center md:min-h-0">
      <h1 className="text-body font-semibold text-sm text-center mb-5 sm:mb-6">
        {contactNumber ? "text-update" : "text-add-new"} {"text-contact-number"}
      </h1>
      <OTP defaultValue={contactNumber} onVerify={onContactUpdate} />
    </div>
  );
};

export default AddOrUpdateCheckoutContact;
