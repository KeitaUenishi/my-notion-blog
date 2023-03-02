import { NEXT_PUBLIC_SITE_TITLE } from './server-constants'
import { Profile } from 'components/Profile'
import GoogleAnalytics from 'components/google-analytics'
import { Hero } from 'components/hero'

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
