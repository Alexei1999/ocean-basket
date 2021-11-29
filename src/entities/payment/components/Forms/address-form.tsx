import Button from "@shared/button";
import * as yup from "yup";
import { Form } from "./forms/form";
import Input from "./forms/input";
import Label from "./forms/label";
import Radio from "./forms/radio/radio";
import TextArea from "./forms/text-area";

enum AddressType {
  Billing = "billing",
  Shipping = "shipping",
}

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

const addressSchema = yup.object().shape({
  type: yup
    .string()
    .oneOf([AddressType.Billing, AddressType.Shipping])
    .required("error-type-required"),
  title: yup.string().required("error-title-required"),
  address: yup.object().shape({
    country: yup.string().required("error-country-required"),
    city: yup.string().required("error-city-required"),
    state: yup.string().required("error-state-required"),
    zip: yup.string().required("error-zip-required"),
    street_address: yup.string().required("error-street-required"),
  }),
});

const AddressForm: React.FC<any> = ({ onSubmit }) => {
  const {
    data: { address, type },
  } = { data: { address: {}, type: AddressType.Billing } } as any;

  return (
    <div className="p-5 sm:p-8 bg-light md:rounded-xl min-h-screen md:min-h-0">
      <h1 className="text-heading font-semibold text-lg text-center mb-4 sm:mb-6">
        {address ? "text-update" : "text-add-new"} {"text-address"}
      </h1>
      <Form<FormValues>
        onSubmit={onSubmit}
        className="grid grid-cols-2 gap-5 h-full"
        validationSchema={addressSchema}
        options={{
          shouldUnregister: true,
          defaultValues: {
            title: address?.title ?? "",
            type: address?.type ?? type,
            ...(address?.address && address),
          },
        }}
      >
        {({ register, formState: { errors } }) => (
          <>
            <div>
              <Label>{"text-type"}</Label>
              <div className="space-s-4 flex items-center">
                <Radio
                  id="billing"
                  {...register("type")}
                  type="radio"
                  value={AddressType.Billing}
                  label={"text-billing"}
                />
                <Radio
                  id="shipping"
                  {...register("type")}
                  type="radio"
                  value={AddressType.Shipping}
                  label={"text-shipping"}
                />
              </div>
            </div>

            <Input
              label={"text-title"}
              {...register("title")}
              error={errors.title?.message!}
              variant="outline"
              className="col-span-2"
            />

            <Input
              label={"text-country"}
              {...register("address.country")}
              error={errors.address?.country?.message!}
              variant="outline"
            />

            <Input
              label={"text-city"}
              {...register("address.city")}
              error={errors.address?.city?.message!}
              variant="outline"
            />

            <Input
              label={"text-state"}
              {...register("address.state")}
              error={errors.address?.state?.message!}
              variant="outline"
            />

            <Input
              label={"text-zip"}
              {...register("address.zip")}
              error={errors.address?.zip?.message!}
              variant="outline"
            />

            <TextArea
              label={"text-street-address"}
              {...register("address.street_address")}
              error={errors.address?.street_address?.message!}
              variant="outline"
              className="col-span-2"
            />

            <Button className="w-full col-span-2">
              {address ? "text-update" : "text-save"} {"text-address"}
            </Button>
          </>
        )}
      </Form>
    </div>
  );
};

export default AddressForm;
