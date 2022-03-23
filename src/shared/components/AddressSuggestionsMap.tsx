import { FormValues } from "@entities/payment/components/Forms/address-form";
import Input from "@entities/payment/components/Forms/forms/input";
import { usePropRef } from "@shared/lib/usePropRef";
import classNames from "classnames";
import { useState, useCallback, useEffect } from "react";
import {
  YMapsApi,
  YMaps,
  Placemark,
  Map,
  ZoomControl,
} from "react-yandex-maps";

const YANDEX_MAP_API_KEY = "9ed3cdf8-1911-49ac-b6d0-70711b8f3edd";

export const MOSCOW_COORDS = [55.752, 37.6237];

type Keys =
  | "country"
  | "province"
  | "area"
  | "locality"
  | "street"
  | "house"
  | "entrance";

const getAddressString = (form: FormValues) => {
  return (
    [form?.city, form?.street, form?.building, form?.part]
      .filter(Boolean)
      .join(" ") + (form?.entrance ? " подъезд " + form?.entrance : "")
  );
};

export const AddressSuggestionsMap = ({
  formInitial,
  onChange,
  onError,
  className,
  errors,
}: {
  formInitial?: FormValues;
  onChange: (data: { [K in Keys]?: string }) => void;
  onError?: (e: any) => void;
  className?: string;
  errors?: string[];
}) => {
  const [ymapsInstance, setYmapsInstance] = useState<YMapsApi | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [coords, setCoords] = useState<Array<number | null>>([null, null]);
  const [viewCoords, setViewCoords] = useState<Array<number | null>>([
    null,
    null,
  ]);
  const [input, setInput] = useState<string>("");

  const decodePosition = useCallback(
    (coords: (number | null)[]) => {
      if (!ymapsInstance) return;
      if (!isReady) return;

      const reverseGeocoder = ymapsInstance.geocode(coords);
      reverseGeocoder.then((data: any) => {
        const components: {
          kind: Keys;
          name: string;
        }[] =
          data.geoObjects.get(0).properties.get("metaDataProperty")
            ?.GeocoderMetaData?.Address?.Components ?? [];

        setInput(data.geoObjects.get(0).properties.get("text"));
        onChange({
          ...components.reduce(
            (obj, { kind, name }) => ({ ...obj, [kind]: name }),
            {}
          ),
        });
      });
    },
    [isReady, ymapsInstance]
  );

  const decodePositionRef = usePropRef(decodePosition);

  const updateInstance = useCallback((instance: any) => {
    if (!instance?.events) return;

    // const onActionHandler = () => {
    //   const coords = instance.getCenter();

    //   setCoords(coords);
    //   onclickhanlderRef.current(coords);
    // };
    // instance.events.add("load", onActionHandler);
    // instance.events.add("actionend", onActionHandler);

    const onclickhanlder = (e: any) => {
      const coords = e.get("coords");

      setCoords(coords);
      decodePositionRef.current(coords);
    };
    instance.events.add("click", onclickhanlder);

    return () => {
      instance.destroy();
    };
  }, []);

  const searchCoords = useCallback(
    (address: string) => {
      if (!ymapsInstance) return;
      if (!isReady) return;
      if (!address) return;

      const searchControl = new ymapsInstance.control.SearchControl({
        options: {
          provider: "yandex#map",
        },
      });

      searchControl.search(address).then((data: any) => {
        const cords = data.geoObjects.get(0).geometry.getCoordinates();
        setCoords(cords);
        setViewCoords(cords);
        decodePosition(cords);
      });
    },
    [isReady, ymapsInstance, decodePosition]
  );

  useEffect(() => {
    if (!ymapsInstance) return;
    if (!isReady) return;
    if (!formInitial) return;

    const address = getAddressString(formInitial);

    searchCoords(address);
  }, [ymapsInstance, isReady, formInitial, searchCoords]);

  useEffect(() => {
    if (!ymapsInstance) return;

    ymapsInstance
      .ready()
      .then(() => {
        setIsReady(true);
      })
      .catch(onError);
  }, [ymapsInstance]);

  useEffect(() => {
    if (!ymapsInstance) return;
    if (!isReady) return;

    const suggestView = new ymapsInstance.SuggestView("suggest");

    if (!suggestView?.events) return;

    suggestView.events.add("select", (e: any) => {
      const value = e.get("item").value;

      setInput(value);
      searchCoords(value);
    });
    suggestView.events.add("error", onError);

    return () => {
      suggestView.destroy();
    };
  }, [isReady, ymapsInstance]);

  const noCoords = viewCoords.some((c) => c === null);
  const _viewCoords = (noCoords ? MOSCOW_COORDS : viewCoords) as number[];

  return (
    <div className={className}>
      <YMaps
        query={{
          lang: "ru_RU",
          mode: "release",
          apikey: YANDEX_MAP_API_KEY,
        }}
      >
        <div className={classNames("flex flex-col")}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            variant={!isReady ? "solid" : "outline"}
            name="address"
            type="text"
            className={classNames("form-control")}
            id="suggest"
            error=""
          ></Input>

          <div className="w-full pt-5">
            <Map
              width="100%"
              instanceRef={updateInstance as any}
              onLoad={setYmapsInstance}
              onError={onError}
              defaultState={{
                center: _viewCoords,
                zoom: noCoords ? 12 : 18,
              }}
              state={{
                center: _viewCoords,
                zoom: noCoords ? 12 : 18,
              }}
              modules={[
                "SuggestView",
                "control.SearchControl",
                "control.ZoomControl",
                "geocode",
              ]}
            >
              <ZoomControl options={{ float: "right" }} />
              {coords.some((c) => c === null) ? null : (
                <Placemark geometry={coords as number[]} />
              )}
            </Map>
            {errors &&
              errors.map((error) => (
                <p className="my-2 text-xs text-red-500">{error}</p>
              ))}
          </div>
        </div>
      </YMaps>
    </div>
  );
};
