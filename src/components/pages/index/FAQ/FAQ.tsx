import React, { useState } from "react";

import Container from "@/components/ui/Container";
import classes from "./FAQ.module.scss";
import useTranslation from 'next-translate/useTranslation'

import { elements } from ".";



const FAQ = () => {

    const { t } = useTranslation();
    const [list, setList] = useState(elements)

    const handleClick = (index: number) => {
        const listTemp = [...list]
        listTemp[index].isHidden = !list[index].isHidden
        setList(listTemp);
    }

    return (
        <section className={classes.faq} id="faq">
            <Container>
                <div className={classes.faq}>
                    <h1 className={classes.faq__title}>{t("faq:title")}</h1>

                    <div className={classes.faq__cardList}>
                        {list.map((element, index, self) => {
                            return (
                                <div key={index} className={classes.faq__cardList_card}>
                                    <div className={classes.faq__cardList_card_question}>
                                        <div className={classes.faq__cardList_card_question_text} onClick={() => handleClick(index)}>
                                            {t(element.question)}
                                            <span className={classes.faq__cardList_card_question_plus}>
                                                &#43;
                                            </span>
                                        </div>
                                        {!element.isHidden ? (
                                            <>
                                                <span className={classes.faq__cardList_card_answer}>
                                                    {t(element.answer)}
                                                    {element.withLink ? (
                                                        <a 
                                                            href={element.link} 
                                                            className={classes.faq__cardList_card_link}
                                                        >
                                                            {element.link}
                                                        </a>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </span>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default FAQ;