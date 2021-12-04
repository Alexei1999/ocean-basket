import { useEffect, useState } from "react";
import { ValidationError } from "./place-order-action";
import Button, { ButtonProps } from "@shared/button";
import { useStore } from "effector-react";
import { $cartSizes } from "@features/choose-dishes/models";

export const CheckAvailabilityAction: React.FC<
  Omit<ButtonProps, "onSubmit"> & { onSubmit: () => void }
> = ({ onSubmit, ...props }) => {
  const { size } = useStore($cartSizes);

  const [errorMessage, setError] = useState<string>();

  function handleVerifyCheckout() {
    // onSubmit?.();
  }

  return (
    <>
      <Button
        // loading={loading}
        className="text-body hover:bg-accent w-full mt-5"
        onClick={handleVerifyCheckout}
        disabled={!size}
        {...props}
      />
      {errorMessage && (
        <div className="mt-3">
          <ValidationError message={errorMessage} />
        </div>
      )}
    </>
  );
};
