import Dialog from "./Dialog";
import { posts } from "../layout";

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const post = posts.find((post) => post.slug === slug);

  return <Dialog {...post} />;
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
