import React, { useState } from "react";

import Container from "@/components/ui/Container";
import classes from "./Scoring.module.scss";
import useTranslation from "next-translate/useTranslation"

import { elements } from ".";

const Scoring = () => {
    
    const { t } = useTranslation();

    return (
        <section id={classes.container}>
            <Container>
                <div className={classes.scoring}>
                    <h1 className={classes.scoring__title}>{t('championship-scoring:title')}</h1>
                    <ul>
                        {elements.map((element, index, self) => {
                            return (
                                <li key={index}>
                                    <div className={classes.rule}>
                                        <p className={classes.rule__text}>{t(element.descripition)}</p>

                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </Container>
        </section>
    );
};

export default Scoring;