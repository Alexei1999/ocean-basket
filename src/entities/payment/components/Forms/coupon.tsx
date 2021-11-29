import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./forms/input";
import Button from "@shared/button";

const Coupon = () => {
  const [hasCoupon, setHasCoupon] = useState(false);
  const [coupon, applyCoupon] = [{}, () => {}] as any;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const { mutate: verifyCoupon, isLoading: loading } = {
    mutate: () => {},
    isLoading: false,
  } as any;
  if (!hasCoupon && !coupon) {
    return (
      <p
        role="button"
        className="text-xs font-bold text-body transition duration-200 hover:text-accent"
        onClick={() => setHasCoupon(true)}
      >
        {"text-have-coupon"}
      </p>
    );
  }
  function onSubmit({ code }: { code: string }) {
    verifyCoupon(
      {
        code,
      },
      {
        onSuccess: (data: { is_valid: any; coupon: any }) => {
          if (data.is_valid) {
            applyCoupon(data.coupon);
            setHasCoupon(false);
          } else {
            setError("code", {
              type: "manual",
              message: "error-invalid-coupon",
            });
          }
        },
      }
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="w-full flex flex-col sm:flex-row"
    >
      <Input
        {...register("code", { required: "text-coupon-required" })}
        placeholder={"text-enter-coupon"}
        variant="outline"
        className="mb-4 sm:mb-0 sm:me-4 flex-1"
        dimension="small"
        error={errors?.code?.message!}
      />
      <Button
        loading={loading}
        disabled={loading}
        size="small"
        className="w-full sm:w-40 lg:w-auto"
      >
        {"text-apply"}
      </Button>
    </form>
  );
};

export default Coupon;
