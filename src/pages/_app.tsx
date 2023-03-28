import '@/styles/globals.scss'
import type { AppProps } from 'next/app'

import Layout from '@/components/layouts/Layout'
import Profile from '@/components/layouts/Profile'
import { useRouter } from "next/router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
			<ToastContainer
				position="bottom-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable={false}
				pauseOnHover
				limit={5}
			/>
		</Layout>
	)
}
