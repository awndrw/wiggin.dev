export function throttle<R, A extends any[]>(
  fn: (...args: A) => R,
  delay: number
): (...args: A) => R {
  let throttled = false;
  let lastResult: R;

  return (...args: A) => {
    if (throttled) return lastResult;

    lastResult = fn(...args);

    throttled = true;

    setTimeout(() => {
      throttled = false;
    }, delay);

    return lastResult;
  };
}
