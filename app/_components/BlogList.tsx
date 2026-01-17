'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Post } from './[id]/Post'
import { MicroCmsPost } from '../_types/MicroCmsPost'

const BlogList = () => {
  const [posts, setPosts] = useState<MicroCmsPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getAllPosts = async () => {
      const response = await fetch(
        'https://wss2nymk8j.microcms.io/api/v1/posts',
        {
          headers: {
            'X-MICROCMS-API-KEY':process.env.NEXT_PUBLIC_MICROCMS_API_KEY as string, 
        },
    })
      const data = await response.json()
      setPosts(data.contents)
      setLoading(false)
    }

    getAllPosts()
  }, [])

  if (loading) return <p>loading</p>
  if (posts.length === 0) return <p>記事が見つかりません</p>

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}
          className='border border-gray-300 max-w-3xl mx-auto my-5'
        >
          <Link
            href={`/post/${post.id}`}
          >
            <div className='flex justify-between mx-4 my-4'>
              <div>{post.createdAt}</div>
              <div className='border-2 border-blue-500 rounded px-2 py-1 text-blue-500'>
                {post.categories.join('')}
              </div>
            </div>

            <h3 className='mx-4 mb-3'>
              {post.title}
            </h3>

            <div>
              <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                className='line-clamp-2 mx-4 mb-3'
              />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
export default BlogList
