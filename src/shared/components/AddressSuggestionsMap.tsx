import Input from "@entities/payment/components/Forms/forms/input";
import { usePropRef } from "@shared/lib/usePropRef";
import { throttle } from "lodash";
import { useState, useCallback, useEffect } from "react";
import { YMapsApi, YMaps, Placemark, Map } from "react-yandex-maps";

const YANDEX_MAP_API_KEY = "58b49e3a-c619-4fe7-8aac-2d76031bb4c6";

export const MOSCOW_COORDS = [55.752, 37.6237];

type Keys =
  | "country"
  | "province"
  | "area"
  | "locality"
  | "street"
  | "house"
  | "entrance";

export const AddressSuggestionsMap = ({
  cordsInitial = MOSCOW_COORDS,
  onChange,
  onError,
  className,
  errors,
}: {
  cordsInitial?: number[];
  onChange: (
    data: { [K in Keys]?: string } & { coords: (null | number)[] }
  ) => void;
  onError?: () => void;
  className?: string;
  errors?: string[];
}) => {
  const [ymaps, setYmaps] = useState<YMapsApi | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [coords, setCoords] = useState<Array<number | null>>([null, null]);
  const [viewCoords, setViewCoords] = useState<Array<number | null>>([
    55.752, 37.6237,
  ]);
  const [input, setInput] = useState<string>("");

  const decodePosition = useCallback(
    (coords: (number | null)[]) => {
      if (!ymaps) return;
      if (!isReady) return;

      const reverseGeocoder = ymaps.geocode(coords);
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
          coords,
        });
      });
    },
    [isReady, ymaps]
  );

  useEffect(() => {
    if (!ymaps) return;
    if (!isReady) return;

    decodePosition(cordsInitial);
    setCoords(cordsInitial);
  }, [decodePosition, ymaps, isReady]);

  const decodePositionRef = usePropRef(decodePosition);

  const updateInstance = useCallback((instance: ymaps.Map) => {
    if (!instance?.events) return;

    // const onActionHandler = () => {
    //   const coords = instance.getCenter();

    //   setCoords(coords);
    //   onclickhanlderRef.current(coords);
    // };
    // instance.events.add("load", onActionHandler);
    // instance.events.add("actionend", onActionHandler);

    const onclickhanlder = (e: ymaps.IEvent<MouseEvent, {}>) => {
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
      if (!ymaps) return;
      if (!isReady) return;
      if (!address) return;

      const searchControl = new ymaps.control.SearchControl({
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
    [isReady, ymaps, decodePosition]
  );

  useEffect(() => {
    if (!ymaps) return;

    ymaps
      .ready()
      .then(() => {
        setIsReady(true);
      })
      .catch(onError);
  }, [ymaps]);

  useEffect(() => {
    if (!ymaps) return;
    if (!isReady) return;

    const suggestView = new ymaps.SuggestView("suggest");

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
  }, [isReady, ymaps]);

  const _viewCoords = (
    viewCoords.some((c) => c === null) ? cordsInitial : viewCoords
  ) as number[];

  return (
    <div className={className}>
      <YMaps
        query={{
          lang: "ru_RU",
          mode: "debug",
          apikey: YANDEX_MAP_API_KEY,
        }}
      >
        <div className="flex flex-col">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            variant="outline"
            name="address"
            type="text"
            className="form-control"
            id="suggest"
            error=""
          />

          <div className="w-full pt-5">
            <Map
              width="100%"
              instanceRef={updateInstance as any}
              onLoad={setYmaps}
              onError={() => console.log("map error")}
              defaultState={{
                center: _viewCoords,
                zoom: 9,
              }}
              state={{
                center: _viewCoords,
                zoom: 9,
              }}
              modules={["SuggestView", "control.SearchControl", "geocode"]}
            >
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
