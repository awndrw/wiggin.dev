import styles from "./layout.module.scss";
import Link from "next/link";
import { Icon } from "../../src/components/Icon";

export const posts = [
  { title: "Hello World", slug: "hello-world", date: "2021-01-01" },
  { title: "Hello World 2", slug: "hello-world-2", date: "2021-01-01" },
  { title: "Hello World 3", slug: "hello-world-3", date: "2021-01-01" },
  { title: "Hello World 4", slug: "hello-world-4", date: "2021-01-01" },
];

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.main}>
      <div className={styles.posts}>
        {posts.map((post) => (
          <Link
            href={`/posts/${post.slug}`}
            className={styles.post}
            key={post.slug}
          >
            <h2>
              {post.title}
              <Icon
                className={styles.icon}
                iconName="arrow-right"
                aria-hidden
                focusable={false}
              />
            </h2>
          </Link>
        ))}
      </div>
      {children}
    </main>
  );
}
