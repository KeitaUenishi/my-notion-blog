import DocumentHead from 'components/document-head'
import { getBlogLink } from 'lib/blog-helpers'
import { getPostBySlug } from 'lib/notion/client'

const BlogSlugHead = async ({ params: { slug } }) => {
  const post = await getPostBySlug(slug)

  return post ? <DocumentHead title={post.Title} path={getBlogLink(post.Slug)} /> : <DocumentHead />
}

export default BlogSlugHead
