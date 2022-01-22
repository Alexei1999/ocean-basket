import React, { InputHTMLAttributes } from "react";
import stylesSimple from "./radio-simple.module.css";
import stylesBig from "./radio-big.module.css";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  name: string;
  id: string;
  error?: string;
  isBig?: boolean;
}

const Radio = React.forwardRef<HTMLInputElement, Props>(
  ({ className, label, name, id, error, isBig = false, ...rest }, ref) => {
    return (
      <div className={className}>
        <div className="flex items-center">
          <input
            id={id}
            name={name}
            type="radio"
            ref={ref}
            className={
              !isBig ? stylesSimple.radio_input : stylesBig.radio_input
            }
            {...rest}
          />

          <label htmlFor={id} className="text-body text-sm">
            {label}
          </label>
        </div>

        {error && <p className="my-2 text-xs text-end text-red-500">{error}</p>}
      </div>
    );
  }
);
Radio.displayName = "Radio";
export default Radio;
