import React from "react";
import Link from "next/link";

import Container from "@/components/ui/Container";

import classes from "./About.module.scss";
import useTranslation from "next-translate/useTranslation";

import { places1, places2 } from ".";

const About = () => {
    const { t } = useTranslation('about');
    return <section className={classes.about} id="about">
            <Container>
                <div className={classes.about__content}>
                    <p className={classes.about__content_title}>{t('title')}</p>
                    <p className={classes.about__content_subtitle}>{t('subtitle')}</p>
                    <Link href="/championship" className={classes.about__more}>
                        {t('more')}
                    </Link>
                </div>

                <div className={classes.about__fund}>
                    <p className={classes.about__fund_title}>{t('fund-title')}</p>
                    <ul className={classes.about__fund_places}>
                    {places1.map((element, index, self) => {
                        return (
                            <li key={index} className={classes.about__fund_places_place}>
                                <p className={classes.about__fund_places_place_item}>{t(element.place)}</p>
                                <p className={classes.about__fund_places_place_item}>{t(element.fund)}</p>
                            </li>
                        )
                    })}
                    </ul>
                </div>

                <div className={classes.about__fund}>
                    <p className={classes.about__fund_title}>{t('fund-title-2')}</p>
                    <ul className={classes.about__fund_places}>
                    {places2.map((element, index, self) => {
                        return (
                            <li key={index} className={classes.about__fund_places_place}>
                                <p className={classes.about__fund_places_place_item}>{t(element.place)}</p>
                                <p className={classes.about__fund_places_place_item}>{t(element.fund)}</p>
                            </li>
                        )
                    })}
                    </ul>
                </div>
            </Container>
        </section>
};

export default About;
