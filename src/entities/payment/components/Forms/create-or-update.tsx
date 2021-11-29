import AddressForm from "./address-form";
import { AddressType } from "./PaymentProccessing";

type FormValues = {
  __typename?: string;
  title: string;
  type: AddressType;
  address: {
    country: string;
    city: string;
    state: string;
    zip: string;
    street_address: string;
  };
};

const CreateOrUpdateAddressForm = () => {
  const {
    data: { customerId, address },
  } = {
    data: {
      customerId: "",
      address: {
        country: "",
        city: "",
        state: "",
        zip: "",
        street_address: "",
      },
    },
  } as any;
  const { closeModal } = { closeModal: () => {} } as any;
  const { mutate: updateProfile } = { mutate: () => {} } as any;

  function onSubmit(values: FormValues) {
    const formattedInput = {
      id: address?.id,
      customer_id: customerId,
      title: values.title,
      type: values.type,
      address: {
        ...(address?.id && { id: address.id }),
        ...values.address,
      },
    };

    updateProfile({
      id: customerId,
      address: [formattedInput],
    });
    closeModal();
  }
  return <AddressForm onSubmit={onSubmit} />;
};

export default CreateOrUpdateAddressForm;
