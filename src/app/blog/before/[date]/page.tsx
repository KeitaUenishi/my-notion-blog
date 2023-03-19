import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  NEXT_PUBLIC_URL,
  NEXT_PUBLIC_SITE_TITLE,
  NEXT_PUBLIC_SITE_DESCRIPTION,
  NUMBER_OF_POSTS_PER_PAGE,
} from 'app/server-constants'
import {
  BlogPostLink,
  BlogTagLink,
  NextPageLink,
  NoContents,
  PostDate,
  PostTags,
  PostTitle,
} from 'components/blog-parts'
import GoogleAnalytics from 'components/google-analytics'
import { getBlogLink } from 'lib/blog-helpers'
import { getRankedPosts, getPostsBefore, getFirstPost, getAllTags } from 'lib/notion/client'
import styles from 'styles/blog.module.css'

export const revalidate = 3600

export async function generateMetadata({ params: { date: encodedDate } }): Promise<Metadata> {
  const date = decodeURIComponent(encodedDate)
  const title = `Post before ${date.split('T')[0]} - ${NEXT_PUBLIC_SITE_TITLE}`
  const description = NEXT_PUBLIC_SITE_DESCRIPTION
  const url = NEXT_PUBLIC_URL ? new URL('/blog', NEXT_PUBLIC_URL) : undefined
  const imageURL = new URL('/images/blog-og-image.jpg', NEXT_PUBLIC_URL)

  const metadata: Metadata = {
    title: title,
    openGraph: {
      title: title,
      description: description,
      url: url,
      siteName: title,
      type: 'website',
      images: [{ url: imageURL }],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [{ url: imageURL }],
    },
    alternates: {
      canonical: url,
    },
  }

  return metadata
}

const BlogBeforeDatePage = async ({ params: { date: encodedDate } }) => {
  const date = decodeURIComponent(encodedDate)

  if (!Date.parse(date) || !/^\d{4}-\d{2}-\d{2}/.test(date)) {
    notFound()
  }

  const [posts, firstPost, rankedPosts, tags] = await Promise.all([
    getPostsBefore(date, NUMBER_OF_POSTS_PER_PAGE),
    getFirstPost(),
    getRankedPosts(),
    getAllTags(),
  ])

  return (
    <>
      <GoogleAnalytics pageTitle={`Posts before ${date.split('T')[0]}`} />
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <header>
            <h2>Posts before {date.split('T')[0]}</h2>
          </header>

          <NoContents contents={posts} />

          {posts.map((post) => {
            return (
              <Link href={getBlogLink(post.Slug)} key={post.Slug}>
                <div className={styles.postContainer}>
                  <div className={styles.post}>
                    <PostDate post={post} />
                    <PostTags post={post} />
                    <PostTitle post={post} />
                  </div>
                </div>
              </Link>
            )
          })}

          <footer>
            <NextPageLink firstPost={firstPost} posts={posts} />
          </footer>
        </div>

        <div className={styles.subContent}>
          <BlogPostLink heading="Recommended" posts={rankedPosts} />
          <BlogTagLink heading="Categories" tags={tags} />
        </div>
      </div>
    </>
  )
}

export default BlogBeforeDatePage
