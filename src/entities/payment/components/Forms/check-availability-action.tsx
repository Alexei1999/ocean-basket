import { useEffect, useState } from "react";
import { ValidationError } from "./place-order-action";
import Button, { ButtonProps } from "@shared/button";
import { $cartSizes } from "@features/choose-dishes/ui";
import { useStore } from "effector-react";
import { $validateErrorsList } from "./address-grid";

export const CheckAvailabilityAction: React.FC<
  Omit<ButtonProps, "onSubmit"> & { onSubmit: () => void }
> = ({ onSubmit, ...props }) => {
  const { size } = useStore($cartSizes);

  const errorList = useStore($validateErrorsList);

  const [errorMessage, setError] = useState<string>();

  useEffect(() => {
    setError("");
  }, [errorList]);

  function handleVerifyCheckout() {
    if (errorList.length) {
      setError(errorList[0]);
      return;
    }
    onSubmit?.();
  }

  return (
    <>
      <Button
        // loading={loading}
        className="text-heading hover:bg-accent w-full mt-5"
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
