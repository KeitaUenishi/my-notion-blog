import Link from 'next/link'
import { notFound } from 'next/navigation'
import { NUMBER_OF_POSTS_PER_PAGE } from 'app/server-constants'
import {
  BlogPostLink,
  BlogTagLink,
  NextPageLink,
  PostDate,
  PostExcerpt,
  PostTags,
  PostTitle,
  ReadMoreLink,
} from 'components/blog-parts'
import GoogleAnalytics from 'components/google-analytics'
import { colorClass } from 'components/notion-block'
import { getBlogLink } from 'lib/blog-helpers'
import {
  getPosts,
  getRankedPosts,
  getPostsByTag,
  getFirstPostByTag,
  getAllTags,
} from 'lib/notion/client'
import styles from 'styles/blog.module.css'
import 'styles/notion-color.css'

export const revalidate = 60

export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map((tag) => ({ tag: tag.name }))
}

const BlogTagPage = async ({ params: { tag: encodedTag } }) => {
  const tag = decodeURIComponent(encodedTag)

  const posts = await getPostsByTag(tag, NUMBER_OF_POSTS_PER_PAGE)

  if (posts.length === 0) {
    notFound()
  }

  const [firstPost, rankedPosts, recentPosts, tags] = await Promise.all([
    getFirstPostByTag(tag),
    getRankedPosts(),
    getPosts(5),
    getAllTags(),
  ])

  const currentTag = posts[0].Tags.find((t) => t.name === tag)

  return (
    <>
      <GoogleAnalytics pageTitle={`Posts in ${tag}`} />
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <header>
            <h2>
              <span className={`tag ${colorClass(currentTag.color)}`}>{tag}</span>
            </h2>
          </header>

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
            <NextPageLink firstPost={firstPost} posts={posts} tag={tag} />
          </footer>
        </div>

        <div className={styles.subContent}>
          <BlogPostLink heading="Recommended" posts={rankedPosts} />
          <BlogPostLink heading="Latest Posts" posts={recentPosts} />
          <BlogTagLink heading="Categories" tags={tags} />
        </div>
      </div>
    </>
  )
}

export default BlogTagPage
