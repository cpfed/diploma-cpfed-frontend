import classes from './Container.module.scss'

import { ReactNode } from 'react'

interface ContainerProps {
	children: ReactNode
}


const Container = ({ children }: ContainerProps) => {
	return (
		<div className={classes.container}>
			{children}
		</div>
	)
}

export default Container