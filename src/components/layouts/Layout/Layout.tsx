import classes from './Layout.module.scss'

import { ReactNode } from 'react'
import dynamic from 'next/dynamic'

import Head from 'next/head'
import Header from '@/components/layouts/Header'

const Footer = dynamic(() => import('../Footer'))

interface LayoutProps {
	children: ReactNode
	title: string
	description: string
}

const Layout = ({
	children,
	title,
	description,
}: LayoutProps) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta charSet="utf-8" />
				<meta name="theme-color" content="#0A0A0A" />
				<meta name="description" content={description} />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className={classes.layout}>
				<Header />
				<main>
					{children}
				</main>
				<Footer />
			</div>
		</>
	)
}

export default Layout