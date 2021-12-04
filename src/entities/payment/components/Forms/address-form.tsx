import { getFromStorage, setToStorage } from "@features/choose-dishes/api";
import Button from "@shared/button";
import { createEvent, createStore } from "effector";
import { useStore } from "effector-react";
import { initial } from "lodash";
import { SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { Form } from "./forms/form";
import Input from "./forms/input";
import TextArea from "./forms/text-area";

export type FormValues = {
  title: string;
  city: string;
  restaurant: string;
  street: string;
  building: string;
  flat: string;
  entrance: string;
  floor: string;
  intercom: string;
  comment: string;
};

const addressSchema = yup.object().shape({
  title: yup.string(),
  city: yup.string().required("Город обязателен к заполнению"),
  restaurant: yup.string().required("Ресторан обязательен к заполнению"),
  street: yup.string().required("Улица обязательна к заполнению"),
  building: yup.string().required("Дом обязателен к заполнению"),
  flat: yup.string().required("Кваритра обязательна к заполнению"),
  entrance: yup.string().required("Подъезд обязательен к заполнению"),
  floor: yup.string().required("Этаж обязательен к заполнению"),
  intercom: yup.string().required("Домофон обязательен к заполнению"),
  comment: yup.string().required("Комментарий обязателен к заполнению"),
});

export const onSubmitForm = createEvent<FormValues>();
export const onResetForm = createEvent<void>();

export const $form = createStore<FormValues | null>(
  getFromStorage<FormValues | null>("form", false)
)
  .on(onSubmitForm, (_, payload) => payload)
  .on(onResetForm, () => null);

$form.watch((form) => {
  setToStorage("form", form);
});

const AddressForm: React.FC<any> = () => {
  const address = useStore($form);

  const onSubmitHandler: SubmitHandler<FormValues> = (props) => {
    onSubmitForm(props);
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
          defaultValues: address ?? {},
        }}
      >
        {({ register, formState: { errors } }) => (
          <>
            <Input
              label={"Город"}
              {...register("city")}
              error={errors.city?.message!}
              variant="outline"
              className="col-span-2"
            />
            <Input
              label={"Ресторан"}
              {...register("restaurant")}
              error={errors.restaurant?.message!}
              variant="outline"
              className="col-span-2"
            />
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
            <Input
              label={"Домофон"}
              {...register("intercom")}
              error={errors.intercom?.message}
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
              label={"Название"}
              {...register("title")}
              error={errors.title?.message}
              variant="outline"
              className="col-span-1"
              placeholder="Например: Домашний"
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
