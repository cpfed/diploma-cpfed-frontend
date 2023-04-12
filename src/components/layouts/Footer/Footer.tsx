import classes from './Footer.module.scss'

import Container from '@/components/ui/Container'
import useTranslation from 'next-translate/useTranslation'
import Link from "next/link";

const Footer = () => {
    const { t } = useTranslation();
    return (
        <footer className={classes.footer}>
            <Container>
                <div className={classes.footer__body}>
                    <div className={classes.social_network}>
                        <p className={classes.social_network__text}>{t("footer:social-network")}</p>
                        <div className={classes.social_network__logos}>
                            <Link href={"https://t.me/cpfed"} target={"_blank"}>
                                <img
                                    src="/images/telegram.png"
                                    alt="logo"
                                    className={classes.social_network__logos__logo}
                                />
                            </Link>
                            <Link href={"https://instagram.com/cpfed.kz?igshid=YmMyMTA2M2Y="} target={"_blank"}>
                                <img
                                    src="/images/instagram.png"
                                    alt="logo"
                                    className={classes.social_network__logos__logo}
                                />
                            </Link>

                        </div>
                    </div>
                    <div className={classes.contacts}>
                        <p className={classes.contacts__text}>{t("footer:contacts")}</p>
                        <Link href={"tel:+77277255527"}><p className={classes.contacts__link}>8 (727) 725 - 55 - 27</p></Link>
                        <Link href={"mailto:cpfed@gmail.com"}><p className={classes.contacts__link}>cpfed@gmail.com</p></Link>
                        <p className={classes.contacts__location}>{t("footer:location")}</p>
                    </div>

                    <div className={classes.usefull_links}>
                        <p className={classes.usefull_links__text}>{t("footer:location")}</p>
                    </div>
                </div>
            </Container>
        </footer>
    )
}

export default Footer