import { useState, useRef, useEffect } from 'react';
import { usePropRef } from './usePropRef';

export type ThrottleOptions =
  | {
      criticalDeps?: unknown[];
      callImmidiatlely?: boolean;
      logs?: string;
    }
  | undefined;

const throttleLog = (name: string, message: string) =>
  console.log(`useThrottleEffect(${name}) :: ${message}`);

export const useThrottleEffect = (
  callback: () => void,
  deps: unknown[],
  ms: number | null = 0,
  { criticalDeps = [], callImmidiatlely = false, logs = undefined }: ThrottleOptions = {}
) => {
  const [isCalled, setIsCalledState] = useState(false);
  const [callbackBoolState, setCallbackBoolState] = useState(false);
  const [timeoutBoolState, setTimeoutBoolState] = useState(false);

  const callbackRef = usePropRef(callback);

  const isDelayedCallRef = useRef(false);
  const isCalledRef = useRef(false);

  const setIsCalled = (state: boolean) => {
    setIsCalledState(state);
    isCalledRef.current = state;
  };
  const forceCallbackUpdate = () => setCallbackBoolState((state) => !state);
  const forceTimeoutUpdate = () => setTimeoutBoolState((state) => !state);

  const resetState = () => {
    logs && throttleLog(logs, 'state resetted');

    isDelayedCallRef.current = false;
    setIsCalled(false);
  };

  useEffect(() => {
    logs && throttleLog(logs, 'critical deps');

    resetState();
  }, criticalDeps);

  useEffect(() => {
    if (!isCalled) return;
    if (!ms) return;

    const timeoutCallback = () => {
      logs && throttleLog(logs, 'timeout callback called');

      setIsCalled(false);

      if (isDelayedCallRef.current) {
        logs && throttleLog(logs, 'timeout callback delayed call');
        isDelayedCallRef.current = false;
        forceCallbackUpdate();
        return;
      }
    };

    logs && throttleLog(logs, 'timeout setted ' + ms);
    const timeout = setTimeout(timeoutCallback, ms);

    return () => {
      clearTimeout(timeout);
    };
  }, [timeoutBoolState, isCalled]);

  useEffect(() => {
    if (callImmidiatlely) {
      logs && throttleLog(logs, 'immidiately call');
      resetState();
      forceTimeoutUpdate();
    }

    if (isCalledRef.current) {
      logs && throttleLog(logs, 'set delayed call');
      isDelayedCallRef.current = true;

      return;
    }

    logs && throttleLog(logs, 'function called');

    callbackRef.current?.();
    setIsCalled(true);
  }, [callbackBoolState, ...deps, ...criticalDeps]);
};
