import React, { FormEvent, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { API } from "@/api/cpdefAPI";

import Container from "@/components/ui/Container";

import classes from "./SignUp.module.scss";

const SignUp = () => {
    const router = useRouter();

    const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        API.signUp(emailRef.current!.value, passwordRef.current!.value)
        .then(_=>router.push('/login'))
        .catch(_=>console.log)
    }

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

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
                            ref={emailRef}
                            placeholder="Введите свою почту"
                            className={classes.form__input}
                            required
                        />
                        <input
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordRef}
                            placeholder="Придумайте пароль"
                            className={classes.form__input}
                            required
                        />
                        <button type="submit" className={classes.form__button}>
                            Зарегистрироваться
                        </button>
                        <Link className={classes.signUp__extension} href="/login">Уже есть аккаунт?</Link>
                    </form>
                </div>
            </Container>
        </section>
    );
};

export default SignUp;
