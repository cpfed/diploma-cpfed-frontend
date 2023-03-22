import React from "react";
import Link from "next/link";

import Container from "@/components/ui/Container";

import classes from "./SignUp.module.scss";

const SignUp = () => {
    function handleSubmit() {}

    return (
        <section className={classes.signUp}>
            <Container>
                <div className={classes.signUp}>
                    <p className={classes.signUp__title}>Создать аккаунт</p>

                    <form onSubmit={handleSubmit} className={classes.form}>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Введите свою почту"
                            className={classes.form__input}
                            required
                        />
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Придумайте пароль"
                            className={classes.form__input}
                            required
                        />
                        <button type="submit" className={classes.form__button}>
                            Зарегистрироваться
                        </button>
                        <Link className={classes.signUp__forgetpassword} href="">Забыли пароль?</Link>
                    </form>
                </div>
            </Container>
        </section>
    );
};

export default SignUp;
