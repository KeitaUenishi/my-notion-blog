import type { Metadata } from 'next'
import {
  NEXT_PUBLIC_URL,
  NEXT_PUBLIC_SITE_TITLE,
  NEXT_PUBLIC_SITE_DESCRIPTION,
} from './server-constants'
import { Profile } from 'components/Profile'
import GoogleAnalytics from 'components/google-analytics'
import { Hero } from 'components/hero'

export async function generateMetadata(): Promise<Metadata> {
  const title = NEXT_PUBLIC_SITE_TITLE
  const description = NEXT_PUBLIC_SITE_DESCRIPTION
  const url = NEXT_PUBLIC_URL ? new URL(NEXT_PUBLIC_URL) : undefined
  const imageURL = new URL('/images/blog-og-image.jpg', NEXT_PUBLIC_URL)

  const metadata: Metadata = {
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

const RootPage = async () => {
  return (
    <>
      <GoogleAnalytics pageTitle={NEXT_PUBLIC_SITE_TITLE} />
      <Hero />
      <Profile />
    </>
  )
}

export default RootPage
