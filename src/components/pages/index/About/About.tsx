import React from "react";
import Link from "next/link";

import Container from "@/components/ui/Container";

import classes from "./About.module.scss";

const About = () => {
    return <section className={classes.about} id="about">
            <Container>
                <div className={classes.about__content}>
                    <p className={classes.about__content_title}>О чемпионате</p>
                    <p className={classes.about__content_subtitle}>Соревнование для школьников, студентов и профессионалов по решению алгоритмических задач. Чемпионат будет проходит в формате, приближенном к международным студенческим соревнованиям по спортивному программированию. По результатам отборочных этапов лучшие 30 участников будут приглашены на финальный этап, в котором определятся лучшие!</p>
                </div>
            </Container>
        </section>
};

export default About;
