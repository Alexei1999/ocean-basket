import { getFromStorage, setToStorage } from "@features/choose-dishes/api";
import Button from "@shared/button";
import { createEvent, createStore } from "effector";
import { useStore } from "effector-react";
import { SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { Form } from "./forms/form";
import Input from "./forms/input";
import Label from "./forms/label";
import Radio from "./forms/radio/radio";
import TextArea from "./forms/text-area";
import { ValidationError } from "./place-order-action";

export type FormValues = {
  title: string;
  city: string;
  street: string;
  building: string;
  part: string;
  flat: number;
  entrance: number;
  floor: number;
  intercom: string | null;
  comment: string;
  persons_number: number;
};

const transformNumber = (value: unknown) => {
  const newValue = parseInt(value as string);
  return isNaN(newValue) ? null : newValue;
};

const addressSchema = yup.object().shape({
  title: yup.string(),
  city: yup.string().required("Город обязателен к заполнению"),
  street: yup.string().required("Улица обязательна к заполнению"),
  building: yup.string().required("Дом обязателен к заполнению"),
  part: yup.string(),
  flat: yup.number().transform(transformNumber).nullable(),
  entrance: yup.number().transform(transformNumber).nullable(),
  floor: yup.number().transform(transformNumber).nullable(),
  intercom: yup.string().nullable().notRequired(),
  comment: yup.string(),
  persons_number: yup
    .number()
    .transform(transformNumber)
    .nullable()
    .required("Количество персон обязательно к заполнению")
    .min(1, "Количество персон не может быть пустым"),
});

export const onSubmitForm = createEvent<FormValues>();
export const onResetForm = createEvent<void>();

const address = getFromStorage<FormValues | null>("form", false);

export const $form = createStore<FormValues | null>(
  addressSchema.isValidSync(address) ? address : null
)
  .on(onSubmitForm, (_, payload) => payload)
  .on(onResetForm, () => null);

$form.watch((form) => {
  setToStorage("form", form);
});

const AddressForm: React.FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
  const address = useStore($form);

  const onSubmitHandler: SubmitHandler<FormValues> = (props) => {
    onSubmitForm(props);
    onSubmit();
  };

  return (
    <div className="p-5 sm:p-8 bg-light md:rounded-xl min-h-screen md:min-h-0">
      <div className="w-full mb-4 sm:mb-6 flex justify-center">
        {/* <AddressSelection className="mr-auto w-[150px]" /> */}
        <h1 className="text-body font-semibold text-lg text-center">
          {/* mr-auto pr-[150px]*/}
          {address ? "Редактирование" : "Добавление"} адреса
        </h1>
      </div>
      <Form<FormValues>
        onSubmit={onSubmitHandler}
        className="grid grid-cols-4 gap-5 h-full"
        validationSchema={addressSchema}
        options={{
          shouldUnregister: true,
          defaultValues: address ?? {
            persons_number: 1,
          },
        }}
      >
        {({ register, watch, formState: { errors } }) => (
          <>
            <Input
              {...register("city")}
              label={"Город"}
              error={errors.city?.message!}
              name="city"
              variant="outline"
              className="col-span-4 sm:col-span-2"
            />
            <Input
              label={"Улица"}
              {...register("street")}
              error={errors.street?.message!}
              variant="outline"
              className="col-span-4 sm:col-span-2"
            />
            <Input
              label={"Дом"}
              {...register("building")}
              error={errors.building?.message}
              className="col-span-4 sm:col-span-2"
              variant="outline"
            />
            <Input
              label={"Корпус / строение"}
              {...register("part")}
              error={errors.part?.message}
              className="col-span-2 sm:col-span-1"
              variant="outline"
            />
            <Input
              label={"Квартира"}
              {...register("flat")}
              error={errors.flat?.message}
              className="col-span-2 sm:col-span-1 no-arrows"
              variant="outline"
              type="number"
            />
            <Input
              label={"Подъезд"}
              {...register("entrance")}
              error={errors.entrance?.message}
              className="col-span-2 sm:col-span-1 no-arrows"
              variant="outline"
              type="number"
            />
            <Input
              label={"Этаж"}
              {...register("floor")}
              error={errors.floor?.message}
              className="col-span-2 sm:col-span-1 no-arrows"
              variant="outline"
              type="number"
            />

            <Input
              label={"Домофон"}
              {...register("intercom")}
              error={errors.intercom?.message}
              className="col-span-2 sm:col-span-1 no-arrows"
              variant="outline"
            />

            <TextArea
              label={"Комментарий"}
              {...register("comment")}
              error={errors.comment?.message}
              variant="outline"
              className="col-span-4"
            />

            <Input
              label={"Колличество персон"}
              {...register("persons_number")}
              error={errors.persons_number?.message}
              variant="outline"
              className="col-span-2 sm:col-span-1"
              type="number"
            />

            <Input
              label={"Название"}
              {...register("title")}
              error={errors.title?.message}
              variant="outline"
              className="col-span-2 sm:col-span-1"
              placeholder="Например: Домашний"
              min={1}
            />

            <Button className="w-full col-span-4 text-body hover:text-accent">
              {address ? "Обновить" : "Сохранить"} {"адрес"}
            </Button>
          </>
        )}
      </Form>
    </div>
  );
};

export default AddressForm;
