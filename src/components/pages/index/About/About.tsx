import React from "react";
import Link from "next/link";

import Container from "@/components/ui/Container";

import classes from "./About.module.scss";
import useTranslation from "next-translate/useTranslation";

import { elements } from ".";

const About = () => {
    const { t } = useTranslation();
    return <section className={classes.about} id="about">
            <Container>
                <div className={classes.about__content}>
                    <p className={classes.about__content_title}>{t('about:title')}</p>
                    <p className={classes.about__content_subtitle}>{t('about:subtitle')}</p>
                    <Link href="/championship" className={classes.about__more}>
                        {t('about:more')}
                    </Link>
                </div>

                <div className={classes.about__fund}>
                    <p className={classes.about__fund_title}>{t('about:fund-title')}</p>
                    <ul className={classes.about__fund_places}>
                    {elements.map((element, index, self) => {
                        return (
                            <li key={index} className={classes.about__fund_places_place}>{t(element.description)}</li>
                        )
                    })}
                    </ul>
                </div>
            </Container>
        </section>
};

export default About;
