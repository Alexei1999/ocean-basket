import { getFromStorage, setToStorage } from "@features/choose-dishes/api";
import Button from "@shared/button";
import { AddressSuggestionsMap } from "@shared/components/AddressSuggestionsMap";
import TextArea from "@shared/components/text-area";
import classNames from "classnames";
import { createEvent, createStore } from "effector";
import { useStore } from "effector-react";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { Form } from "./forms/form";
import Input from "./forms/input";
import { SwitchIcon } from "./SwitchIcon";

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

const onHandleMode = createEvent();
const onToggleMode = createEvent();
const $isMapMode = createStore(true)
  .on(onHandleMode, () => false)
  .on(onToggleMode, (state) => !state);

const AddressForm: React.FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
  const isMapMode = useStore($isMapMode);
  const [isSwitchShown, setIsSwitchShown] = useState(true);

  const form = useStore($form);

  const onSubmitHandler: SubmitHandler<FormValues> = (props) => {
    onSubmitForm(props);
    onSubmit();
  };

  return (
    <div className="p-5 sm:p-8 bg-light md:rounded-xl min-h-screen md:min-h-0">
      <div className="w-full mb-4 sm:mb-6 flex justify-center relative">
        {isSwitchShown && (
          <SwitchIcon
            width={35}
            height={35}
            className={classNames(
              "text-body hover:text-accent cursor-pointer -mt-1 absolute left-0 top-0"
            )}
            onClick={() => onToggleMode()}
          />
        )}
        <h1 className="text-body font-semibold text-lg text-center">
          {form ? "Редактирование" : "Добавление"} адреса
        </h1>
      </div>
      <Form<FormValues>
        onSubmit={onSubmitHandler}
        className="grid grid-cols-4 gap-5 h-full"
        validationSchema={addressSchema}
        options={{
          shouldUnregister: true,
          defaultValues: form ?? {
            persons_number: 1,
          },
        }}
      >
        {({ register, setValue, formState: { errors }, clearErrors }) => (
          <>
            <AddressSuggestionsMap
              formInitial={form ?? undefined}
              className={classNames("col-span-4", !isMapMode && "hidden")}
              onChange={(data) => {
                setValue(
                  "entrance",
                  parseInt(data.entrance?.replace(/\D/g, "") as string)
                );
                setValue("building", data.house ?? "");
                setValue("city", data.locality ?? "");
                setValue("street", data.street ?? "");

                clearErrors();
              }}
              onError={(e) => {
                console.error(e);
                toast.error("Проблема с загрузкой карты");
                setIsSwitchShown(false);
                onHandleMode();
              }}
              errors={
                [
                  errors.city?.message,
                  errors.street?.message,
                  errors.building?.message,
                  errors.part?.message,
                ].filter(Boolean) as string[]
              }
            />

            <Input
              {...register("city")}
              label={"Город"}
              error={errors.city?.message!}
              name="city"
              variant="outline"
              className={classNames(
                "col-span-4 sm:col-span-2",
                isMapMode && "hidden"
              )}
            />
            <Input
              label={"Улица"}
              {...register("street")}
              error={errors.street?.message!}
              variant="outline"
              className={classNames(
                "col-span-4 sm:col-span-2",
                isMapMode && "hidden"
              )}
            />
            <Input
              label={"Дом"}
              {...register("building")}
              error={errors.building?.message}
              className={classNames(
                "col-span-4 sm:col-span-2",
                isMapMode && "hidden"
              )}
              variant="outline"
            />
            <Input
              label={"Корпус / строение"}
              {...register("part")}
              error={errors.part?.message}
              className={classNames(
                "col-span-2 sm:col-span-1",
                isMapMode && "hidden"
              )}
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
              {form ? "Обновить" : "Сохранить"} {"адрес"}
            </Button>
          </>
        )}
      </Form>
    </div>
  );
};

export default AddressForm;
