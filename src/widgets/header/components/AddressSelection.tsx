import { addresses } from "@pages/ContactsPage/config";
import classNames from "classnames";
import { createEvent, createStore } from "effector";
import { useEvent, useStore } from "effector-react";
import { useEffect } from "react";

export const onRestaurantSelection = createEvent<string | null>();

export const $restaurant = createStore<string | null>(null).on(
  onRestaurantSelection,
  (_, payload) => payload
);

export const AddressSelection = ({ className }: { className?: string }) => {
  const restaurant = useStore($restaurant);

  const addressesList = addresses
    .flatMap(({ regions }) => regions)
    .flatMap(({ region, addresses }) => ({
      region,
      addresses: addresses.flatMap(({ address }) => address),
    }));

  useEffect(() => {
    if (!restaurant) {
      onRestaurantSelection(addressesList[0].addresses[0]);
    }
  }, [restaurant]);

  return (
    <select
      value={restaurant ?? undefined}
      onChange={(e) => onRestaurantSelection(e.target.value)}
      className={classNames(
        className,
        "text-body overflow-ellipsis text-sm pr-2"
      )}
    >
      {addressesList.map(({ region, addresses }) => (
        <optgroup key={region} label={region}>
          {addresses.map((address) => (
            <option key={address} value={address}>
              {address}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
};
