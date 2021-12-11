import { getFromStorage, setToStorage } from "@features/choose-dishes/api";
import Button from "@shared/button";
import { createEvent, createStore } from "effector";
import { useStore } from "effector-react";
import { initial } from "lodash";
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
  street: string;
  building: string;
  flat: string;
  entrance: string;
  floor: string;
  intercom: string | null;
  comment: string;
  persons_number: number;
};

const addressSchema = yup.object().shape({
  title: yup.string(),
  // city: yup.string().required("Город обязателен к заполнению"),
  street: yup.string().required("Улица обязательна к заполнению"),
  building: yup.string().required("Дом обязателен к заполнению"),
  flat: yup.string().required("Кваритра обязательна к заполнению"),
  entrance: yup.string().required("Подъезд обязательен к заполнению"),
  floor: yup.string().required("Этаж обязательен к заполнению"),
  intercom: yup.string().notRequired(),
  comment: yup.string().required("Комментарий обязателен к заполнению"),
  persons_number: yup
    .number()
    .transform((value) => (isNaN(value) ? null : parseInt(value)))
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
      <h1 className="text-body font-semibold text-lg text-center mb-4 sm:mb-6">
        {address ? "Редактирование" : "Добавление"} адреса
      </h1>
      <Form<FormValues>
        onSubmit={onSubmitHandler}
        className="grid grid-cols-4 gap-5 h-full"
        validationSchema={addressSchema}
        options={{
          shouldUnregister: true,
          defaultValues: address ?? {
            intercom: "1",
            persons_number: 1,
          },
        }}
      >
        {({ register, watch, formState: { errors } }) => (
          <>
            <Input
              label={"Улица"}
              {...register("street")}
              error={errors.street?.message!}
              variant="outline"
              className="col-span-2"
            />
            <Input
              label={"Дом"}
              {...register("building")}
              error={errors.building?.message}
              className="col-span-2"
              variant="outline"
            />
            <Input
              label={"Квартира"}
              {...register("flat")}
              error={errors.flat?.message}
              variant="outline"
            />
            <Input
              label={"Подъезд"}
              {...register("entrance")}
              error={errors.entrance?.message}
              variant="outline"
            />
            <Input
              label={"Этаж"}
              {...register("floor")}
              error={errors.floor?.message}
              variant="outline"
            />

            <div>
              <Label>Наличие домофона</Label>
              <div className="space-s-4 flex items-center">
                <Radio
                  id="Exist"
                  {...register("intercom")}
                  type="radio"
                  value="1"
                  label="Есть"
                  checked={watch("intercom") === "1"}
                />
                <Radio
                  id="Missing"
                  {...register("intercom")}
                  type="radio"
                  value="0"
                  label="Нет"
                  checked={watch("intercom") === "0"}
                />
              </div>
              <ValidationError message={errors.intercom?.message} />
            </div>

            <Input
              label={"Колличество персон"}
              {...register("persons_number")}
              error={errors.persons_number?.message}
              variant="outline"
              className="col-span-1"
              type="number"
            />

            <TextArea
              label={"Комментарий"}
              {...register("comment")}
              error={errors.comment?.message}
              variant="outline"
              className="col-span-4"
            />

            <Input
              label={"Название"}
              {...register("title")}
              error={errors.title?.message}
              variant="outline"
              className="col-span-1"
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
