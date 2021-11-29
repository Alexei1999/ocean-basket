import getStripe from "@entities/suggestion/lib/get-stripejs";
import Button from "@shared/button";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";

const StripeForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [_, setVerifiedToken] = [, () => {}] as any;
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    // Block native form submission.
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    setLoading(true);

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement)!;

    // Use your card Element with other Stripe.js APIs
    const { error, token } = await stripe.createToken(cardElement);

    if (error) {
      setLoading(false);
      return;
    }
    if (token) {
      setVerifiedToken(token.id);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <CardElement />
      <Button
        type="submit"
        loading={loading}
        disabled={!stripe}
        className="StripePay mt-5 ms-auto"
      >
        {"text-confirm"}
      </Button>
    </form>
  );
};
const StripePayment: React.FC = () => {
  return (
    <Elements stripe={getStripe()}>
      <StripeForm />
    </Elements>
  );
};

export default StripePayment;
