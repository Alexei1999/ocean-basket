import { createEvent, createStore } from "effector";
import { useStore } from "effector-react";
import React, { useState, useEffect, useRef, useMemo } from "react";

import styles from "./styles.module.scss";
import {
  $smScreen,
  $mdScreen,
  $lgScreen,
} from "@entities/dishes/components/Card/DishCard";
import { createGate, useGate } from "effector-react/effector-react.cjs";

import { BouncingFishes } from "./BouncingFishes";
import { RoutesConfig } from "@shared/lib/routes-config";
import { useLocation } from "react-router-dom";

const LOADING_DEFAULT_TIME = 3000;

export const onChangeAnimationConfig = createEvent<{
  name: RoutesConfig;
  config: Partial<ConfigType>;
}>();
export const onRemoveAnimationConfig = createEvent<RoutesConfig>();
export const onStartLoading = createEvent<number | undefined>();

const gateLoadingContainer = createGate<{
  onResetState: () => void;
  updateTime: (time: number) => void;
  stopLoading: () => void;
}>();
gateLoadingContainer.state.on(
  onStartLoading,
  ({ onResetState, updateTime }, payload) => {
    if (payload) {
      updateTime(payload);
    }

    onResetState();
  }
);

type ConfigType = {
  isEndlessMode: boolean;
  maxLoadingTime?: number;
  duration?: number;
};
const DEFAULT_CONFIG: ConfigType = {
  isEndlessMode: false,
};
const $animationConfig = createStore<{
  [K in RoutesConfig]?: ConfigType;
}>({
  [RoutesConfig.Dashboard]: {
    isEndlessMode: true,
    maxLoadingTime: 20000,
  },
  [RoutesConfig.Menu]: {
    isEndlessMode: false,
  },
})
  .on(onChangeAnimationConfig, (state, { name, config }) => ({
    ...state,
    [name]: { ...state[name], ...config },
  }))
  .on(onRemoveAnimationConfig, (state, name) => ({
    ...state,
    [name]: undefined,
  }));

export function usePropRef<T>(prop: T) {
  const ref = useRef<T>(prop);
  useEffect(() => {
    ref.current = prop;
  }, [prop]);
  return ref;
}

export const setIsLoading = createEvent<boolean>();
export const $isLoadingAnimation = createStore(true).on(
  setIsLoading,
  (_, payload) => payload
);

export const FishAnimationContainer: React.FC = ({ children }) => {
  const { pathname } = useLocation();

  const [isTimedOut, setIsTimedOut] = useState(false);
  const [isFishLoaded, setIsFishLoaded] = useState(false);
  const [isBoolState, setBoolState] = useState(false);

  const isSmallScreen = useStore($smScreen);
  const isMediumScreen = useStore($mdScreen);
  const isLargeScreen = useStore($lgScreen);

  const isLoading = useStore($isLoadingAnimation);

  const isMobile = isSmallScreen || isMediumScreen || isLargeScreen;

  const animationConfig = useStore($animationConfig);

  const { isEndlessMode, maxLoadingTime, duration } = useMemo(() => {
    if (!pathname) return DEFAULT_CONFIG;

    return animationConfig[pathname as RoutesConfig] ?? DEFAULT_CONFIG;
  }, [animationConfig, pathname]);

  const time = duration ?? LOADING_DEFAULT_TIME;
  const timeRef = usePropRef(time);

  useEffect(() => {
    if (!maxLoadingTime) return;
    if (!isFishLoaded) return;

    const timeout = setTimeout(() => {
      setIsTimedOut(true);
      setIsLoading(false);
    }, maxLoadingTime);

    return () => {
      clearTimeout(timeout);
    };
  }, [isFishLoaded, maxLoadingTime]);

  const onResetState = () => {
    setIsLoading(true);
    setIsTimedOut(false);
    setBoolState((state) => !state);
  };

  useEffect(() => {
    if (!isEndlessMode && isTimedOut) {
      setIsLoading(false);
    }
  }, [isEndlessMode, isTimedOut]);

  useEffect(() => {
    if (animationConfig[pathname as RoutesConfig]) {
      onResetState();
    }
  }, [pathname, animationConfig]);

  useGate(gateLoadingContainer, {
    onResetState,
    stopLoading: () => {
      setIsLoading(false);
    },
    updateTime: (time: number) => {
      onChangeAnimationConfig({
        name: pathname as RoutesConfig,
        config: { duration: time },
      });
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTimedOut(true);
    }, timeRef.current);

    return () => {
      clearTimeout(timer);
    };
  }, [isBoolState, isFishLoaded]);

  return (
    <>
      {isLoading && (
        <div className="absolute lg:top-22 md:top-16 top-14 left-0 h-screen w-screen z-[1000] bg-light flex flex-col justify-around pt-5 pb-16">
          {isMobile && (
            <BouncingFishes
              isRtl
              canMoving={isFishLoaded}
              onAnyLoad={() => {
                setIsFishLoaded(true);
              }}
              duration={time}
              isRepeatable={isEndlessMode}
            />
          )}
          <BouncingFishes
            className={styles.swim}
            canMoving={isFishLoaded}
            onAnyLoad={() => {
              setIsFishLoaded(true);
            }}
            duration={time}
            isRepeatable={isEndlessMode}
          />
          {isMobile && (
            <BouncingFishes
              isRtl
              canMoving={isFishLoaded}
              onAnyLoad={() => {
                setIsFishLoaded(true);
              }}
              className={styles.swim}
              duration={time}
              isRepeatable={isEndlessMode}
            />
          )}
        </div>
      )}
      {children}
    </>
  );
};
