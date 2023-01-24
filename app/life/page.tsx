import Image from "next/image";
import image1 from "../../public/life/life1.jpg";
import image2 from "../../public/life/life2.jpg";
import image3 from "../../public/life/life3.jpg";
import image4 from "../../public/life/life4.jpg";
import image5 from "../../public/life/life5.jpg";
import styles from "./page.module.scss";

const images = [image1, image2, image3, image4, image5];

export default function Page() {
  return (
    <div className={styles.page}>
      <section className={styles.section}>
        {images.map((image) => (
          <Image
            src={image}
            key={image.src}
            className={styles.image}
            alt="image"
            placeholder="blur"
          />
        ))}
      </section>
    </div>
  );
}
