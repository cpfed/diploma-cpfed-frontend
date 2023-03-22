import React, { FormEvent, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import Container from "@/components/ui/Container";

import classes from "./SignUp.module.scss";
import axios from "lib/axios";

const SignUp = () => {
    const router = useRouter();
    const session = useSession();
    if(session && session.data && session.data.user)
    {
        const currentTime = Math.round((new Date()).getTime() / 1000);
        if(session.data.user.exp - currentTime >= 5)
        {
            router.push("/profile");
        }
    }

    const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        axios.post("api/authentication/v1/sign-up/", {
            email: emailRef.current?.value,
            password: passwordRef.current?.value
        })
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
