import classes from './Frame.module.scss'

import { ReactNode } from 'react'

interface FrameProps {
	children: ReactNode
}


const Frame = ({ children }: FrameProps) => {
	return (
		<div className={classes.container}>
			{children}
		</div>
	)
}

export default Frame