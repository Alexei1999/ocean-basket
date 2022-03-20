import { useEffect, useRef } from 'react';

export const usePropRef = <T>(prop: T): React.MutableRefObject<T> => {
  const propRef = useRef(prop);

  useEffect(() => {
    propRef.current = prop;
  }, [prop]);

  return propRef;
};
