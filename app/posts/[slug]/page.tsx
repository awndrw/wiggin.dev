import { sdk } from "cms";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const { allPosts } = await sdk.AllPostsSlugs();

  return allPosts.map(({ slug }) => ({ slug }));
}

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const { post } = await sdk.PostBySlug({ slug });

  if (!post) {
    notFound();
  }

  return (
    <div>
      <h1>{post.title}</h1>
    </div>
  );
}
