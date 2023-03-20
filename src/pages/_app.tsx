import { SessionProvider } from "next-auth/react"
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'

import Layout from '@/components/layouts/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout {...pageProps}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Layout>
  )
}
