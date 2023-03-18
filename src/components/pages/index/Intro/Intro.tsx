import React from "react";
import Link from "next/link";

import Container from "@/components/ui/Container";

import classes from "./Intro.module.scss";


const Intro = () => {
    return (
        <Container>
            <section className={classes.intro}>
                    <img src="images/intro.png"></img>
                    <div className={classes.intro__content}>
                        <p className={classes.intro__description}>Чемпионат Казахстана по спортивному программированию</p>
                        <button className={classes.intro__button}>Зарегистрироваться</button>
                    </div>
            </section>
        </Container>
    );
};

export default Intro;
