import '@/styles/globals.scss'
import type { AppProps } from 'next/app'

import Layout from '@/components/layouts/Layout'
import Profile from '@/components/layouts/Profile'
import { useRouter } from "next/router";


export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();

	return (
		<Layout {...pageProps}>
			{router.pathname.startsWith('/profile') ? (
					<Profile {...pageProps}>
						<Component {...pageProps} />
					</Profile>
				) : (
					<Component {...pageProps} />
				)
			}
		</Layout>
	)
}
