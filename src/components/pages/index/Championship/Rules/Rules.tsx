import React from "react";

import Container from "@/components/ui/Container";
import classes from "./Rules.module.scss";
import useTranslation from "next-translate/useTranslation"

import { elements, WithLink } from ".";
import Link from "next/link";

const Rules = () => {
    
    const { t } = useTranslation();

    return (
        <section id={classes.container}>
            <Container>
                <div className={classes.rules}>
                    <h1 className={classes.rules__title}>{t("championship-rules:title")}</h1>
                    <ul>
                        {elements.map((element, index, self) => {
                            return (
                                <li
                                    key={index}
                                >
                                    <div className={classes.rule}>
                                        {element.withLink ? (
                                            <div>
                                                <span className={classes.rule__text}>{t((element.description as WithLink).beforeLink)}</span>
                                                <Link className={classes.rule__link} href={"mailto:"+(element.description as WithLink).link}>{(element.description as WithLink).link}</Link>
                                                <span className={classes.rule__text}>{t((element.description as WithLink).afterLink)}</span>
                                            </div>
                                        ) : (
                                            <p className={classes.rule__text}>{t(element.description as string)}</p>
                                        )}

                                        {element.imageUrl != null ? (
                                            <img src={element.imageUrl} className={classes.rule__img}></img>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                    
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </Container>
        </section>
    );
};

export default Rules;