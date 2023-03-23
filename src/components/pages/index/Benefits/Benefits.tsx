import React from "react";
import Container from "@/components/ui/Container";

import classes from "./Benefits.module.scss";
import { elements } from ".";

const Benefits = () => {
    return <section className={classes.benefits} id="benefits">
            <Container>
                <p className={classes.benefits__title}>Преимущества участия в чемпионате</p>
                <ul className={classes.benefits__list}>
                {elements.map((element, index, self) => {
                            return (
                                <li
                                    key={index}
                                    className={classes.benefits__list_item}
                                >
                                    <img src={element.image}></img>
                                    <p>{element.title}</p>

                                </li>
                            );
                        })}
                </ul>
            </Container>
        </section>
};

export default Benefits;
