import c from "classnames";
import * as Dialog from "client/radix/Dialog";
import { Icon } from "components/Icon";
import { InternalLink } from "components/InternalLink";
import styles from "./WarningDialog.module.scss";

export const WarningDialog = ({
  warning,
  continueHref,
}: {
  warning: string;
  continueHref: string;
}) => (
  <Dialog.Portal>
    <Dialog.Overlay className={styles.overlay} />
    <Dialog.Content className={styles.container}>
      <Icon iconName="alert-triangle" className={styles.header} />
      <Dialog.Description className={styles.body}>{warning}</Dialog.Description>
      <div className={styles.footer}>
        <Dialog.Close className={c(styles.closeButton, styles.secondaryButton)}>
          Close
        </Dialog.Close>
        <Dialog.Close asChild>
          <InternalLink
            role="button"
            href={continueHref}
            className={c(styles.closeButton, styles.primaryButton)}
          >
            Continue
          </InternalLink>
        </Dialog.Close>
      </div>
    </Dialog.Content>
  </Dialog.Portal>
);
