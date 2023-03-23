import React, { useState } from "react";

import Container from "@/components/ui/Container";
import classes from "./Intro.module.scss";
import useTranslation from "next-translate/useTranslation"

const Intro = () => {
    
    const { t } = useTranslation();

    return (
        <section className={classes.intro} id="intro">
            <Container>
                <div className={classes.intro}>
                    <h1 className={classes.intro__title}>{t('championship-intro:title')}</h1>
                    <div className={classes.intro__image_and_description}>
                        <img className={classes.description__img} src="images/championship_intro.png"></img>
                        <div className={classes.description}>
                            <p className={classes.description__text}>{t('championship-intro:description-part-1')}</p>
                            <br></br>
                            <p className={classes.description__text}>{t('championship-intro:description-part-2')}</p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Intro;