import React from "react";

import Container from "@/components/ui/Container";
import classes from "./Documents.module.scss";
import useTranslation from "next-translate/useTranslation";

import Link from "next/link";

import { elements } from ".";

const Documents = () => {
    const { t } = useTranslation();

    return (
        <section className={classes.documents} id="documents">
            <Container>
                <div className={classes.documents}>
                    <h1 className={classes.documents__title}>
                        {t("documents:title")}
                    </h1>
                    <ul>
                        {elements.map((element, index, self) => {
                            return (
                                <li key={index} className={classes.item}>
                                    <Link href={element.link} className={classes.document}>
                                        <p className={classes.document__text}>
                                            {t(element.title)}
                                        </p>
                                        <img
                                            src="images/document_link_button.png"
                                            className={classes.document__img}
                                        ></img>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </Container>
        </section>
    );
};

export default Documents;
