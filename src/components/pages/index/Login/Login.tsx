import Container from "@/components/ui/Container";
import { signIn, useSession } from "next-auth/react";
import React, { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/router";

import classes from "./Login.module.scss";
import Link from "next/link";

const Login = () => {
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

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsIncorrect(false);

        const result = await signIn("credentials", {
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
            redirect: false,
        });

        if(result)
        {
            if(!result.error) router.push("/profile");
            else setIsIncorrect(true);
        } 
    };

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [isIncorrect, setIsIncorrect ] = useState(false);

    return (
        <section className={classes.login}>
            <Container>
                <div className={classes.login}>
                    <p className={classes.login__title}>Войти</p>

                    <form onSubmit={handleSubmit} className={classes.form}>
                        {
                            isIncorrect 
                            ? <p className={classes.login__message}>Неверный логин или пароль</p>
                            : undefined
                        }
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
                            placeholder="Введите пароль"
                            className={classes.form__input}
                            required
                        />
                        <button type="submit" className={classes.form__button}>
                            Продолжить
                        </button>
                        <Link className={classes.login__extension} href="/signUp">Еще не зарегистрирован?</Link>
                        <Link className={classes.login__extension} href="">Забыли пароль?</Link>
                    </form>
                </div>
            </Container>
        </section>
    );
};

export default Login;
