'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image'
import { MicroCmsPost } from '../_types/MicroCmsPost'

const PostDetail = () => {
  const [post, setPost] = useState<MicroCmsPost | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState(false);

  useEffect(() => {
    const getAllPosts = async () => {
    const response = await fetch(
      `https://wss2nymk8j.microcms.io/api/v1/posts/${id}`,
    {
      headers: {
        'X-MICROCMS-API-KEY':
          process.env.NEXT_PUBLIC_MICROCMS_API_KEY as string,
      } ,
    })
    const data = await response.json();
    setPost(data);
    setLoading(false);
    if (!data) {
      setError(true);
    }
  };
  getAllPosts();
  }, [id]);

  if (loading) return <p>loading</p>
  if (error || !post)  return <p>記事が見つかりません</p>
  
  return (
    <div className='w-[800px] mx-auto'>
      {post.thumbnail?.url && (
        <Image
          src={post.thumbnail.url}
          width={800}
          height={400}
          alt={post.title}
        />
      )}

      <div className='flex justify-between mx-5 items-center my-3'>
        <div>{post.createdAt}</div>
        <div className='border-2 border-blue-500 rounded px-2 py-1 text-blue-500 inline-block'>
          {post.categories.map((category) => (
            <span key={category.id}>{category.name}</span>
          ))}
        </div>
      </div>
      <h2  className='text-2xl mb-3 mx-4'>
        {post.title}
      </h2>
      <div dangerouslySetInnerHTML={{ __html: post.content }} 
        className='mx-4 mb-20'
      />
    </div>
  )
}

export default PostDetail
