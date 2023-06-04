import { useStore } from "live/useStore";

import { Cursor as CursorComponent } from "./Cursor";

export function Cursors() {
  const cursorIds = useStore((store) =>
    Object.values(store).reduce(
      (cursors, user) => (user.cursor ? cursors.concat(user.id) : cursors),
      [] as string[]
    )
  );

  console.log("cursors");

  return (
    <>
      {cursorIds.map((cursorId) => (
        <CursorComponent id={cursorId} key={cursorId} />
      ))}
    </>
  );
}
