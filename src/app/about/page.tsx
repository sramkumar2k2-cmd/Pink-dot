export default function AboutPage() {
  return (
    <div className="about-page">
      <h1>About Us</h1>
      <p>Welcome to our website. This is a static page generated at build time.</p>
    </div>
  )
}






// This enables Static Site Generation for this page
export const dynamic = 'force-static'