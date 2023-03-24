import React from "react";
import Link from "next/link";

import Container from "@/components/ui/Container";

import classes from "./Intro.module.scss";
import useTranslation from "next-translate/useTranslation";

const Intro = () => {
    const { t } = useTranslation();

    return (
        <section className={classes.intro} id="intro">
            <Container>
                <div className={classes.intro}>
                    <img src="images/intro.png"></img>
                    <div className={classes.intro__content}>
                        <p className={classes.intro__description}>
                            {t('intro:title')}
                        </p>
                        <button className={classes.intro__button}>
                            {t('intro:button')}
                        </button>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Intro;
