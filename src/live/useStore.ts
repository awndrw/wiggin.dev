import isEqual from "lodash/isEqual";
import { useSyncExternalStoreWithSelector } from "use-sync-external-store/with-selector";

import { store } from "./store";
import { type User } from "./types";

export function useStore<T>(
  selector: (users: Record<User["id"], User>) => T
): T {
  return useSyncExternalStoreWithSelector(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
    selector,
    isEqual
  );
}
