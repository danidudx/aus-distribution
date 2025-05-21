'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';

const BlogPost = () => {
  const params = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await client.fetch(
          `*[_type == "post" && _id == $id][0]{
            title,
            body,
            mainImage,
            author->{
              name
            },
            publishedAt,
            categories[]->{
              title
            }
          }`,
          { id: params.id }
        );
        setPost(post);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPost();
    }
  }, [params.id]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!post) {
    return <div className="text-center py-10">Post not found</div>;
  }

  return (
    <article className="bg-[#fffae7] py-12 min-h-screen">
      <div className="max-w-4xl mb-20 mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-[#0B2F3D] font-[Tropiline] mb-8">
          {post.title}
        </h1>
        
        {post.mainImage && (
          <div className="mb-8">
            <Image
              src={urlForImage(post.mainImage).url()}
              alt={post.mainImage.alt || post.title}
              width={1200}
              height={600}
              className="rounded-lg object-cover w-full md:h-[400px] h-[200px]"
            />
          </div>
        )}

        <div className="mb-8 text-[#8F9FA6]">
          <p className="text-lg">
            By {post.author?.name || 'Unknown Author'} ·{' '}
            {new Date(post.publishedAt).toLocaleDateString()}
          </p>
          {post.categories && post.categories.length > 0 && (
            <div className="mt-2">
              {post.categories.map((category) => (
                <span
                  key={category.title}
                  className="inline-block bg-[#0B2F3D] text-white px-3 py-1 rounded-full text-sm mr-2"
                >
                  {category.title}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="prose max-w-none text-[#0B2F3D] text-lg font-[Montserrat]">
          <PortableText value={post.body} />
        </div>
      </div>
    </article>
  );
};

export default BlogPost;