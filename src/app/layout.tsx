import { NEXT_PUBLIC_SITE_TITLE, NEXT_PUBLIC_SITE_DESCRIPTION } from 'app/server-constants'
import Footer from 'components/footer'
import Header from 'components/header'
import 'styles/global.css'
import 'styles/syntax-coloring.css'

export const metadata = {
  title: NEXT_PUBLIC_SITE_TITLE,
  description: NEXT_PUBLIC_SITE_DESCRIPTION,
}

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="ja" prefix="og: https://ogp.me/ns#">
    <body>
      <div>
        <Header />
        <div>{children}</div>
        <Footer />
      </div>
    </body>
  </html>
)

export default RootLayout
