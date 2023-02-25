import { NUMBER_OF_POSTS_PER_PAGE } from 'app/server-constants'
import GoogleAnalytics from 'components/google-analytics'
import {
  BlogPostLink,
  BlogTagLink,
  NextPageLink,
  NoContents,
  PostDate,
  PostExcerpt,
  PostTags,
  PostTitle,
  ReadMoreLink,
} from 'components/blog-parts'
import styles from 'styles/blog.module.css'
import { getPosts, getFirstPost, getRankedPosts, getAllTags } from 'lib/notion/client'
import Link from 'next/link'
import { getBlogLink } from 'lib/blog-helpers'

export const revalidate = 60

const BlogPage = async () => {
  const [posts, firstPost, rankedPosts, tags] = await Promise.all([
    getPosts(NUMBER_OF_POSTS_PER_PAGE),
    getFirstPost(),
    getRankedPosts(),
    getAllTags(),
  ])

  return (
    <>
      <GoogleAnalytics pageTitle="Blog" />
      <div className={styles.container}>
        <div className={styles.mainContent}>
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

export default BlogPage
