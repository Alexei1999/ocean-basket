import { onUpdateScreen } from "@entities/dishes/components/Card/DishCard";
import { usePropRef } from "@shared/lib/usePropRef";
import classNames from "classnames";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";

import styles from "./styles.module.scss";

import fish1 from "./рыбка1.png";
import fish2 from "./рыбка2.png";

enum Directions {
  Left = "left",
  Right = "right",
}

export const BouncingFishes: React.FC<{
  canMoving?: boolean;
  className?: string;
  style?: React.CSSProperties;
  isRtl?: boolean;
  onAnyLoad?: () => void;
  onLoad?: () => void;
  onFinish?: (direction: Directions) => void;
  duration: number;
  isRepeatable?: boolean;
}> = ({
  canMoving = true,
  className,
  style,
  isRtl = false,
  onFinish,
  onAnyLoad,
  onLoad,
  duration,
  isRepeatable = false,
}) => {
  const isLoadCalledRef = useRef(false);
  const [isAnimationStarted, setAnimationStarted] = useState(false);
  const [loadCounter, setLoadCounter] = useState(0);

  const [direction, setDirection] = useState<Directions>(
    isRtl ? Directions.Left : Directions.Right
  );
  const timeRef = useRef<number>(duration);

  const changeDirection = useCallback(() => {
    if (!isRepeatable) return;
    if (isLoadCalledRef.current) return;

    setDirection((state) =>
      state === Directions.Left ? Directions.Right : Directions.Left
    );
  }, [isRepeatable]);

  const useChangeDirectionRef = usePropRef(changeDirection);

  const directionRef = usePropRef(direction);
  const onFinishRef = usePropRef(onFinish);
  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      onFinishRef.current?.(directionRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      useChangeDirectionRef.current();
    }, timeRef.current);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction]);

  useEffect(() => {
    if (loadCounter === 3) {
      onLoad?.();
    }
  }, [onLoad, loadCounter]);

  useEffect(() => {
    onUpdateScreen();
  }, []);

  useEffect(() => {
    if (canMoving) {
      setAnimationStarted(true);
    }
  }, [canMoving]);

  const onLoadSafely = () => {
    setLoadCounter((loadCounter) => loadCounter + 1);

    if (isLoadCalledRef.current) return;

    onAnyLoad?.();
  };

  const { fish1Config, fish2Config, fish3Config } = useMemo(() => {
    const fish1Padding = Math.floor(Math.random() * 3) as 0 | 1 | 2;
    const darkColorNumber = Math.floor(Math.random() * 3) as 0 | 1 | 2;
    const fish1Duration = Math.floor(Math.random() * 3) as 0 | 1 | 2;

    return {
      fish1Config: {
        padding: fish1Padding,
        order: darkColorNumber,
        delay: fish1Duration,
      },
      fish2Config: {
        padding: (fish1Padding + 1) % 3,
        order: (darkColorNumber + 1) % 3,
        delay: (fish1Duration + 1) % 3,
      },
      fish3Config: {
        padding: (fish1Padding + 2) % 3,
        order: (darkColorNumber + 2) % 3,
        delay: (fish1Duration + 2) % 3,
      },
    } as {
      [K: string]: { padding: 0 | 1 | 2; order: 0 | 1 | 2; delay: 0 | 1 | 2 };
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction]);

  const getPadding = (padding: 0 | 1 | 2) =>
    ({
      0: undefined,
      1: "ml-[30%]",
      2: "ml-[60%]",
    }[padding]);

  const getOrder = (order: 0 | 1 | 2) =>
    ({
      0: "order-0",
      1: "order-1 my-3",
      2: "order-2",
    }[order]);

  const getDelay = (delay: 0 | 1 | 2) =>
    ({
      0: "0.1s",
      1: "0.5s",
      2: "0.9s",
    }[delay]);

  return (
    <div
      className={classNames(
        className,
        isAnimationStarted && styles.swim,
        {
          [styles.swimLeft]:
            isAnimationStarted && direction === Directions.Left,
          [styles.swimRight]:
            isAnimationStarted && direction === Directions.Right,
        },
        "w-1/4 flex flex-col",
        direction === Directions.Left ? "ml-auto" : "mr-auto"
      )}
      style={{
        animationDuration: `${duration / 1000}s`,
        ...(direction === Directions.Left && { transform: "scaleX(-1)" }),
        ...style,
      }}
    >
      <img
        alt="fishes"
        className={classNames(
          "w-[40%]",
          getPadding(fish1Config.padding),
          getOrder(fish1Config.order),
          styles.bounce
        )}
        style={{ animationDelay: getDelay(fish1Config.delay) }}
        src={fish2}
        onLoad={onLoadSafely}
      />
      <img
        alt="fishes"
        className={classNames(
          "w-[40%]",
          getPadding(fish2Config.padding),
          getOrder(fish2Config.order),
          styles.bounce
        )}
        style={{ animationDelay: getDelay(fish2Config.delay) }}
        src={fish1}
        onLoad={onLoadSafely}
      />
      <img
        alt="fishes"
        className={classNames(
          "w-[40%]",
          getPadding(fish3Config.padding),
          getOrder(fish3Config.order),
          styles.bounce
        )}
        style={{ animationDelay: getDelay(fish3Config.delay) }}
        src={fish2}
        onLoad={onLoadSafely}
      />
    </div>
  );
};
