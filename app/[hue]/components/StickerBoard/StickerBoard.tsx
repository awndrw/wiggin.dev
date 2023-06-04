import { BindUserState } from "./BindUserState";
import styles from "./StickerBoard.module.scss";
import { Cursors } from "./cursors/Cursors";
import { Users } from "./users/Users";

export function StickerBoard() {
  return (
    <div className={styles.wrapper}>
      <BindUserState />
      <Cursors />
      <Users />
    </div>
  );
}
