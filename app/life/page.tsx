import Image from "next/image";
import image1 from "../../public/life/life1.jpg";
import image2 from "../../public/life/life2.jpg";
import image3 from "../../public/life/life3.jpg";
import image4 from "../../public/life/life4.jpg";
import image5 from "../../public/life/life5.jpg";
import styles from "./page.module.scss";

const images = [image1, image2, image3, image4, image5];

const baseProps = {
  className: styles.image,
  placeholder: "blur",
} as const;

export default function Page() {
  const showCopy = false;

  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <Image {...baseProps} src={image1} alt="image" />
        {showCopy && (
          <div className={styles.text}>
            I couldn&apos;t resist including a few cat and dog pictures. so here
            they are.
          </div>
        )}
        <Image {...baseProps} src={image2} alt="image" />
        <Image {...baseProps} src={image3} alt="image" />
        <Image {...baseProps} src={image4} alt="image" />
        <Image {...baseProps} src={image5} alt="image" />
      </section>
    </div>
  );
}
