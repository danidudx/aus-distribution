"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await client.fetch(
          `*[_type == "post"] | order(publishedAt desc) {
            _id,
            title,
            mainImage,
            publishedAt,
            body,
            author->{
              name
            },
            categories[]->{
              title
            }
          }`
        );
        setPosts(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#fffae7] xl:py-12 py-6 xl:pb-40 md:pb-20">
        <h1 className="xl:text-[50px] text-[40px] font-extrabold text-center text-[#0B2F3D] font-[Tropiline] leading-[90px] xl:mb-12 mb-6">
          Blogs
        </h1>
        <div className="text-center py-10">Loading...</div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="bg-[#fffae7] xl:py-12 py-6 xl:pb-40 md:pb-20">
      <h1 className="xl:text-[50px] text-[40px] font-extrabold text-center text-[#0B2F3D] font-[Tropiline] leading-[90px] xl:mb-12 mb-6">
        Blogs
      </h1>
      <div className="flex flex-row flex-wrap xl:flex-1 xl:gap-20 gap-10 w-[90%] mx-auto justify-center items-center">
        {posts.map((post) => (
          <Link
            href={`/Blog/${post._id}`}
            key={post._id}
            className="bg-transparent xl:w-[628px] xl:h-[644px] md:w-[70%] cursor-pointer transition-transform hover:scale-105"
          >
            {post.mainImage && (
              <Image
                src={urlForImage(post.mainImage).url()}
                alt={post.mainImage.alt || post.title}
                width={628}
                height={240}
                className="w-full h-[240px] object-cover rounded-3xl"
              />
            )}
            <div className="p-6">
              <h2 className="text-[#0B2F3D] font-[Tropiline] xl:text-[32px] text-2xl xl:leading-[48px] xl:font-extrabold mb-4">
                {post.title}
              </h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories?.map((category) => (
                  <span
                    key={category.title}
                    className="inline-block bg-[#0B2F3D] text-white px-3 py-1 rounded-full text-sm"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
              <p className="text-[#8F9FA6] xl:text-xl text-lg xl:font-medium font-[Montserrat] xl:leading-[150%] mb-4">
                {formatDate(post.publishedAt)} · By {post.author?.name}
              </p>
              <div className="text-[#0B2F3D] xl:text-xl text-lg xl:font-medium font-[Montserrat] xl:leading-[150%] mb-6 line-clamp-3">
                <PortableText value={post.body} />
              </div>
              <span className="text-[#0B2F3D] font-bold xl:text-2xl text-lg font-[Montserrat] xl:leading-[150%] underline">
                Learn More
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
