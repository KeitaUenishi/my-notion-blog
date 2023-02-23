import Link from 'next/link'
import { NEXT_PUBLIC_SITE_TITLE } from './server-constants'
import GoogleAnalytics from 'components/google-analytics'
import styles from 'styles/page.module.css'

const RootPage = () => (
  <>
    <GoogleAnalytics pageTitle={NEXT_PUBLIC_SITE_TITLE} />
    <div className={styles.container}>
      <div className={styles.hero} >
        <div>あれやこれや</div>
        <div>{NEXT_PUBLIC_SITE_TITLE}</div>
      </div>
    </div>
  </>
)

export default RootPage
