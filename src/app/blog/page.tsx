export default function BlogPage() {
  return (
    <div className="blog-page">
      <h1>Blog</h1>
      <div className="blog-posts">
        <article>
          <h2>First Blog Post</h2>
          <p>This is a sample blog post content.</p>
        </article>
      </div>
    </div>
  )
}

// This enables Static Site Generation for this page
export const dynamic = 'force-static'