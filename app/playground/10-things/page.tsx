"use client";

import {
  a,
  easings,
  useChain,
  useInView,
  useSpring,
  useSpringRef,
} from "@react-spring/web";
import c from "classnames";
import React from "react";
import { flexaMono } from "fonts";
import styles from "./page.module.scss";

export default function Page() {
  const [showBlueScreen, setShowBlueScreen] = React.useState(false);

  const [mainRef, inView] = useInView();

  const zoomStyleRef = useSpringRef();
  const zoomStyle = useSpring({
    ref: zoomStyleRef,
    text: inView ? "scale(1)" : "scale(0.4)",
    plants: inView ? "scale(1.6)" : "scale(1)",
    leftPlant: inView ? "translateX(50%)" : "translateX(0%)",
    rightPlant: inView ? "translateX(-30%)" : "translateX(0%)",
    config: {
      duration: 3600,
      easing: easings.easeInOutQuad,
      precision: 0.0001,
    },
    delay: 650,
  });

  const textStyleRef = useSpringRef();
  const continueButtonStyle = useSpring({
    ref: textStyleRef,
    opacity: inView ? 1 : 0,
    config: {
      duration: 1000,
      easing: easings.easeInOutQuad,
    },
    delay: 700,
  });

  useChain([zoomStyleRef, textStyleRef]);

  const onContinueClick = () => {
    setShowBlueScreen(true);
  };

  return (
    <main ref={mainRef} className={styles.main}>
      {/* PLANTS */}
      <a.div style={{ transform: zoomStyle.plants }} className={styles.plants}>
        <Large
          style={{
            left: "5%",
            transform: zoomStyle.leftPlant,
          }}
          className={styles.plant}
        />
        <Medium style={{ left: "30%" }} className={styles.plant} />
        <Small
          style={{ right: "35%", transform: "scale(-1, 1)" }}
          className={styles.plant}
        />
        <XLarge
          style={{
            right: "5%",
            transform: zoomStyle.rightPlant,
          }}
          className={styles.plant}
        />
      </a.div>

      {/* TEXT */}
      <a.div style={{ transform: zoomStyle.text }} className={styles.content}>
        <p>focus on the user and all else will follow</p>
        <p>
          this is my favorite excerpt from{" "}
          <a
            href="https://about.google/philosophy"
            target="_blank"
            rel="noreferrer"
          >
            Google’s “10 things”
          </a>
        </p>
        <a.button style={continueButtonStyle} onClick={onContinueClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a.button>
      </a.div>

      {showBlueScreen && (
        <div className={c(styles.blueScreen, flexaMono.className)}>test</div>
      )}
    </main>
  );
}

type AvailableSvgProps = Omit<
  React.ComponentProps<typeof a.svg>,
  "width" | "height" | "viewBox" | "xmlns"
>;

const Small = (props: AvailableSvgProps) => (
  <a.svg
    width="78"
    height="221"
    viewBox="0 0 78 221"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M56.0717 221.107C55.7918 123.906 42.6481 70.3014 30.7582 41.6292M55.7359 221.107C56.2285 130.422 75.6082 111.39 75.6082 111.39M12.7332 4.04522C10.662 1.30228 6.76587 0.742493 4.02292 2.8025C1.29117 4.86251 0.742579 8.76981 2.82498 11.524C6.87782 14.961 11.7703 19.82 16.383 26.3583C19.6857 31.0493 22.0928 35.5387 23.8281 39.4012C25.8881 42.133 29.8178 42.6928 32.5384 40.644C35.2813 38.584 35.8187 34.6767 33.7475 31.9337C31.486 27.1643 28.1944 21.3538 23.4363 15.3305C19.7641 10.6843 16.0471 6.9673 12.7332 4.05642V4.04522Z" />
  </a.svg>
);

const Medium = (props: AvailableSvgProps) => (
  <a.svg
    width="116"
    height="357"
    viewBox="0 0 116 357"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M16.37 142.887C16.37 142.887 83.37 150.891 88.37 356.99M88.99 356.99C88.57 196.453 56.52 99.1365 35.14 52.0239M113.8 259.944C113.8 259.944 89.36 272.95 89.36 356.99M13.81 6.20197C11.55 2.7103 7.26001 1.46971 4.24001 3.43065C1.21001 5.39158 0.600011 9.8137 2.87001 13.3054C7.31001 17.8976 12.68 24.2506 17.72 32.5046C21.34 38.4274 23.95 43.9801 25.85 48.7123C28.1 52.184 32.42 53.4346 35.43 51.4837C38.45 49.5227 39.06 45.1006 36.8 41.6089C34.33 35.7461 30.75 28.5427 25.54 20.859C21.52 14.9362 17.45 10.0638 13.82 6.20197H13.81Z" />
  </a.svg>
);

const Large = (props: AvailableSvgProps) => (
  <a.svg
    width="203"
    height="455"
    viewBox="0 0 203 455"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M52.1968 450.644C51.6994 218.934 98.8842 108.454 139.147 56.3782M52.2935 454.789C46.8911 255.826 2.29004 235.1 2.29004 235.1M138.843 39.6183C134.338 43.1416 133.537 49.6494 137.06 54.1675C140.584 58.6718 147.091 59.4732 151.61 55.9499C157.205 49.1105 165.123 40.8204 175.858 32.9724C183.568 27.3351 190.96 23.2314 197.33 20.2193C201.806 16.7237 202.622 10.1468 199.112 5.67011C195.589 1.1658 189.081 0.364415 184.563 3.88773C176.687 7.7841 167.126 13.4076 157.261 21.4905C149.648 27.7357 143.568 34.0224 138.829 39.6183H138.843Z" />
  </a.svg>
);

const XLarge = (props: AvailableSvgProps) => (
  <a.svg
    width="303"
    height="467"
    viewBox="0 0 303 467"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M57.075 46.4697C99.7767 94.1786 156.225 206.158 167.546 467.235M300.782 213.762C300.782 213.762 169.085 176.441 168.308 467.235M222.221 116.447C195.614 164.638 165.897 264.068 167.779 467.235M167.406 467.235C164.404 342.831 120.086 339.721 120.086 339.721M220.262 103.073C217.058 106.635 217.338 112.093 220.868 115.281C224.414 118.468 229.872 118.173 233.075 114.612C236.683 108.174 242.001 100.212 249.714 92.1881C255.235 86.4344 260.724 81.9715 265.529 78.5659C268.702 75.0359 268.437 69.5311 264.923 66.3588C261.377 63.1709 255.919 63.4664 252.716 67.0274C246.807 71.3816 239.762 77.3996 232.811 85.4859C227.446 91.7216 223.356 97.7863 220.277 103.058L220.262 103.073ZM16.9703 3.25488C13.0671 0.424695 7.23571 1.79314 3.95456 6.30278C0.657856 10.828 1.17102 16.7994 5.07419 19.6451C12.0719 22.382 20.7646 26.6895 29.5973 33.625C35.9264 38.6011 40.887 43.7795 44.6813 48.4135C48.5534 51.2281 54.447 49.8597 57.697 45.3656C60.9782 40.8404 60.4806 34.869 56.5774 32.0388C51.7257 26.3629 45.0545 19.7695 36.1907 13.6737C29.3485 8.97746 22.724 5.64966 16.9859 3.27043L16.9703 3.25488Z" />
  </a.svg>
);
