import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { getBlogPost } from '@/lib/blog'
import styles from './blog-post.module.css'

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <Link 
        href="/blog" 
        className="inline-flex items-center text-gray-600 hover:text-accent mb-10 group text-base"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Blog
      </Link>

      <article className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="relative h-[500px]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="mb-4">
              <span className="bg-accent text-white text-xs font-medium px-3 py-1 rounded-full">
                {post.category}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center text-white/90 text-sm">
              <div className="flex items-center mr-8">
                <Calendar className="w-4 h-4 mr-1" />
                <time dateTime={post.date}>
                  {format(new Date(post.date), 'MMMM d, yyyy')}
                </time>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{post.readingTime} min read</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <div className={styles['blog-content']}>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-600 hover:text-accent transition-colors">
                <Share2 className="w-4 h-4 mr-2" />
                <span>Share</span>
              </button>
            </div>
            <Link 
              href="/booking" 
              className="inline-flex items-center justify-center px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
            >
              Book a Service
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
} 
