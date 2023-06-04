export function debounce<R, A extends any[]>(
  fn: (...args: A) => R,
  delay: number
): (...args: A) => R {
  let timeout: NodeJS.Timeout;
  let lastResult: R;

  return (...args: A) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      lastResult = fn(...args);
    }, delay);
    return lastResult;
  };
}
