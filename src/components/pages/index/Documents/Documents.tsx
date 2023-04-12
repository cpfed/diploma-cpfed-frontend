import React from "react";

import Container from "@/components/ui/Container";
import classes from "./Documents.module.scss";
import useTranslation from "next-translate/useTranslation";

import Link from "next/link";

import { elements } from ".";
import "@/utils/icons"
import icons from "@/utils/icons";

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
                                    <Link href={t(element.link)} target={"_blank"} className={classes.document}>
                                        <p className={classes.document__text}>
                                            {t(element.title)}
                                        </p>
                                        <img
                                            src={icons.documentLinkButton.src}
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
