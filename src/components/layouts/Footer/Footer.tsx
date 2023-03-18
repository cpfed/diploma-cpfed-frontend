import classes from './Footer.module.scss'

import Container from '@/components/ui/Container'

const Footer = () => {
	return (
		<footer className={classes.footer}>
			<Container>
				<div className={classes.footer__body}>
                    <div className={classes.footer__body_first}>
                        <img
                            src="/images/facebook.png"
                            alt="logo"
                            className={classes.footer__logo}
                        />
                        <img
                            src="/images/instagram.png"
                            alt="logo"
                            className={classes.footer__logo}
                        />
                        <img
                            src="/images/linkedin.png"
                            alt="logo"
                            className={classes.footer__logo}
                        />
                    </div>
					<p className={classes.footer__copyright}>
						©2023 Все Права Защищены
					</p>
				</div>
			</Container>
		</footer>
	)
}

export default Footer