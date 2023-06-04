import { useStore } from "live/useStore";

import { User } from "./User";

export function Users() {
  const userIds = useStore((store) => Object.keys(store));

  console.log("users");

  return (
    <>
      {userIds.map((userId) => (
        <User id={userId} key={userId} />
      ))}
    </>
  );
}
