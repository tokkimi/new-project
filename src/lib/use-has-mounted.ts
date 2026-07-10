import * as React from "react";

const subscribe = () => () => {};

/** True only after client-side hydration — avoids SSR/client mismatch for browser-only UI. */
export function useHasMounted() {
  return React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
