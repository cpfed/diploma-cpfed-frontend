import React from "react";

import Container from "@/components/ui/Container";
import classes from "./Documents.module.scss";
import useTranslation from "next-translate/useTranslation"

import Link from "next/link"

import { elements } from ".";

const Documents = () => {
    
    const { t } = useTranslation();

    return (
        <section id={classes.container}>
            <Container>
                <div className={classes.documents}>
                    <h1 className={classes.documents__title}>{t('documents:title')}</h1>
                    <ul>
                        {elements.map((element, index, self) => {
                            return (
                                <Link href={element.link}>
                                    <li key={index} className={classes.document}>
                                            <p className={classes.document__text}>{t(element.title)}</p>
                                            <img src="images/document_link_button.png" className={classes.document__img}></img>
                                    </li>
                                </Link>
                            )
                        })}
                    </ul>
                </div>
            </Container>
        </section>
    );
};

export default Documents;