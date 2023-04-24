import React from "react";

import Container from "@/components/ui/Container";
import classes from "./Partners.module.scss";

import { elements } from ".";
import useTranslation from "next-translate/useTranslation";

const Partners = () => {

    const { t } = useTranslation();

    return (
        <section className={classes.partners} id="partners">
            <Container>
                <div className={classes.partners}>
                    <p className={classes.partners__title}>{t('partners:our-partners')}</p>
                    <ul className={classes.partners__container}>
                        {elements.map((element, index, self) => {
                            return (
                                <li key={index} className={classes.img_container}>
                                    <img className={classes.img_container__img} src={element.src}></img>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </Container>
        </section>
    )
}

export default Partners;
