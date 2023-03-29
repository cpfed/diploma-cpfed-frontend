import React from "react";
import Container from "@/components/ui/Container";

import classes from "./Benefits.module.scss";
import { elements } from ".";
import useTranslation from "next-translate/useTranslation";

const Benefits = () => {
    const { t } = useTranslation();

    return (
        <section className={classes.benefits} id="benefits">
            <Container>
                <p className={classes.benefits__title}>{t("benefits:title")}</p>
                <ul className={classes.benefits__list}>
                    {elements.map((element, index, self) => {
                        return (
                            <li
                                key={index}
                                className={classes.benefits__list__item}
                            >
                                <img src={element.image}></img>
                                <p className={classes.benefits__list__item__title}>{t(element.title)}</p>
                                <p className={classes.benefits__list__item__content}>{t(element.content)}</p>
                            </li>
                        );
                    })}
                </ul>
            </Container>
        </section>
    );
};

export default Benefits;
