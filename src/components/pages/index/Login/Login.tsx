"use client";
import Container from "@/components/ui/Container";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useRef } from "react";

import classes from "./Login.module.scss";

const Login = () => {

    const { data: session } = useSession({
        required: true,
    });
    console.log({ session });

    const onSubmit = async() => {
        const result = await signIn("credentials", {
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
            redirect: true,
            callbackUrl: "/profile",
        })
    };

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    return(
        <section>
            <Container>
                <h1>{session?.user.phone_number}</h1>
                <div className={classes.form__item}>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        ref={emailRef}
                        placeholder="Электронная почта"
                        className={classes.form__input}
                        required
                    />
                </div>
                <div className={classes.form__item}>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        ref={passwordRef}
                        placeholder="Пароль"
                        className={classes.form__input}
                        title="Min length is 8"
                        minLength={8}
                        required
                    />
                </div>
                <button onClick={onSubmit} className={classes.form__button}>
                    Login
                </button>
            </Container>
        </section>
    );
    
};

export default Login;
