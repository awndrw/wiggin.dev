import c from "classnames";
import { type Route } from "next";
import Link from "next/link";
import { AlertTriangle } from "react-feather";

import { Icon } from "components/Icon";
import * as Dialog from "components/external/radix/Dialog";

import styles from "./WarningDialog.module.scss";

export const WarningDialog = ({
  warning,
  continueHref,
}: {
  warning: string;
  continueHref: Route;
}) => (
  <Dialog.Portal>
    <Dialog.Overlay className={styles.overlay} />
    <Dialog.Content className={styles.container}>
      <Icon icon={AlertTriangle} className={styles.header} />
      <Dialog.Description className={styles.body}>{warning}</Dialog.Description>
      <div className={styles.footer}>
        <Dialog.Close className={c(styles.closeButton, styles.secondaryButton)}>
          Close
        </Dialog.Close>
        <Dialog.Close asChild>
          <Link
            role="button"
            href={continueHref}
            className={c(styles.closeButton, styles.primaryButton)}
          >
            Continue
          </Link>
        </Dialog.Close>
      </div>
    </Dialog.Content>
  </Dialog.Portal>
);
