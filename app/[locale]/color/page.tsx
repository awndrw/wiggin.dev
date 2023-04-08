import c from "classnames";

import { Balancer } from "client/Balancer";
import { Separator } from "client/radix/Separator";
import { ExternalLink } from "components/Link";
import { Page as PageWrapper } from "components/Page";
import { Section } from "components/Section";
import { tragedyDisplay } from "fonts/tragedyDisplay";

import { LightnessScale, ChromaScale, HueScale } from "./Scale";
import styles from "./page.module.scss";

export const metadata = {
  title: "color",
};

export default function Page() {
  return (
    <PageWrapper withAffordance={false} className={tragedyDisplay.className}>
      <Section type="neutral" fullHeight bottomSeparator>
        <Balancer>
          The OKLCH color space, part of{" "}
          <ExternalLink href="https://www.w3.org/TR/css-color-4">
            CSS Color Module 4
          </ExternalLink>
          , uses Lightness, Chroma, and Hue to describe color.
        </Balancer>
      </Section>
      <Section type="neutral" bottomSeparator>
        <Balancer>
          Lightness is the <em>perceived</em> brightness of a color (which is
          different from HSL&apos;s lightness value)
        </Balancer>
        <div className={styles.scale}>
          <LightnessScale />
        </div>
      </Section>
      <Section type="neutral" bottomSeparator>
        <Balancer>
          Chroma represents the saturation of a color, from grey to fully
          saturated.
        </Balancer>
        <div className={styles.scale}>
          <ChromaScale />
        </div>
      </Section>
      <Section type="neutral" bottomSeparator>
        <Balancer>
          Hue is the angle around the color wheel, from 0 to 360 degrees.
        </Balancer>
        <div className={styles.scale}>
          <HueScale />
        </div>
      </Section>
      <Section type="neutral">
        <Balancer>Bla bla bla</Balancer>
      </Section>
    </PageWrapper>
  );
  return (
    <main className={c(styles.page, tragedyDisplay.className)}>
      <section className={styles.section}>
        <div className={styles.hero}>
          <Balancer>
            The OKLCH color space, part of{" "}
            <ExternalLink href="https://www.w3.org/TR/css-color-4">
              CSS Color Module 4
            </ExternalLink>
            , uses Lightness, Chroma, and Hue to describe color.
          </Balancer>
        </div>
        <Separator
          orientation="horizontal"
          decorative
          className={styles.separatorPrimary}
        />
        <div className={styles.lchDescription}>
          <Balancer>
            Lightness is the <em>perceived</em> brightness of a color (which is
            different from HSL&apos;s lightness value)
          </Balancer>
          <div className={styles.scale}>
            <LightnessScale />
          </div>
        </div>
        <Separator
          orientation="horizontal"
          decorative
          className={styles.separatorSecondary}
        />
        <div className={styles.lchDescription}>
          <Balancer>
            Chroma represents the saturation of a color, from grey to fully
            saturated.
          </Balancer>
          <div className={styles.scale}>
            <ChromaScale />
          </div>
        </div>
        <Separator
          orientation="horizontal"
          decorative
          className={styles.separatorSecondary}
        />
        <div className={styles.lchDescription}>
          <Balancer>
            Hue is the angle around the color wheel, from 0 to 360 degrees.
          </Balancer>
          <div className={styles.scale}>
            <HueScale />
          </div>
        </div>
      </section>
      <Separator
        orientation="horizontal"
        decorative
        className={styles.separatorPrimary}
      />
      <section className={styles.section}>
        <Balancer>Bla bla bla</Balancer>
      </section>
    </main>
  );
}

// It is a perceptually uniform color space, meaning that the distance between
// two colors is the same as the distance between any two other colors. This is
// in contrast to the RGB color space, which is not perceptually uniform. The
// OKLCH color space is also a cylindrical color space, meaning that the color
// is described by a single angle and two distances from the center of the color
// space. This is in contrast to the HSL color space, which is a spherical color
// space, meaning that the color is described by two angles and a distance from
// the center of the color space.
