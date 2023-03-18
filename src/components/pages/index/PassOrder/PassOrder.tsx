import React from "react";

import Container from "@/components/ui/Container";
import classes from "./PassOrder.module.scss";

import { elements } from ".";

const PassOrder = () => {
    return (
        <section id={classes.container}>
            <Container>
                <div className={classes.passOrder}>
                    <h1 className={classes.passOrder__title}>Порядок прохождения</h1>
                    <div className={classes.passOrder__cardList}>
                        {elements.map((element, index, self) => {
                            return (
                                <div key={index} className={classes.passOrder__cardList_card}>
                                    <p className={classes.passOrder__cardList_card_number}>{index + 1}</p>
                                    <p className={classes.passOrder__cardList_card_description}>{element.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default PassOrder;
