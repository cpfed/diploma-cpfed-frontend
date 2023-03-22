import React, { useState } from "react";

import Container from "@/components/ui/Container";
import classes from "./FAQ.module.scss";

import { elements, FAQElement } from ".";



const FAQ = () => {

    const [list, setList] = useState(elements)

    const handleClick = (index: number) => {
        const listTemp = [...list]
        listTemp[index].isHidden = !list[index].isHidden
        setList(listTemp); 
    }
    
    return (
        <section id={classes.container}>
            <Container>
                <div className={classes.faq}>
                    <h1 className={classes.faq__title}>Вопрос-Ответ</h1>
                    
                    <div className={classes.faq__cardList}>
                        {list.map((element, index, self) => {
                            return (
                                <div key={index} className={classes.faq__cardList_card}>
                                    <div className={classes.faq__cardList_card_question} onClick={() => handleClick(index)}>
                                        <p className={classes.faq__cardList_card_question_text}>
                                            {element.question} 
                                            <span className={classes.faq__cardList_card_question_plus}>
                                                &#43;
                                            </span>
                                        </p>
                                        {!element.isHidden ? (
                                            <p className={classes.faq__cardList_card_answer}>
                                                {element.answer}
                                            </p>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <button className={classes.faq__button}>
                        Задать свой вопрос
                    </button>
                </div>
            </Container>
        </section>
    );
};

export default FAQ;