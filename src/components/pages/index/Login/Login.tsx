import Container from "@/components/ui/Container";
import React, { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/router";
import { API } from "@/api/cpdefAPI";

import classes from "./Login.module.scss";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { login } from "@/store/account/thunk";
import { useAppDispatch } from "@/hooks/reduxHooks";
import toast from "@/utils/toast";

const Login = () => {
    const dispatch = useAppDispatch();

    const router = useRouter();
    const { t } = useTranslation();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        dispatch(login({
            email: emailRef.current?.value,
            password: passwordRef.current?.value
        }))
        .unwrap()
        .then(res=>{
            router.push("/profile");
        })
        .catch(error=>{
            toast.error(t("login:incorrect"))
        })
    };

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    return (
        <section className={classes.login}>
            <Container>
                <div className={classes.login}>
                    <p className={classes.login__title}>{t("login:title")}</p>

                    <form onSubmit={handleSubmit} className={classes.form}>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            ref={emailRef}
                            placeholder={t("login:enter-email")}
                            className={classes.form__input}
                            required
                        />
                        <input
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordRef}
                            placeholder={t("login:enter-password")}
                            className={classes.form__input}
                            required
                        />
                        <button type="submit" className={classes.form__button}>
                            {t("login:continue")}
                        </button>
                        <Link
                            className={classes.login__extension}
                            href="/signUp"
                        >
                            {t("login:not-registered-yet")}
                        </Link>
                        <Link className={classes.login__extension} href="/forgot-password">
                            {t("login:forgot-password")}
                        </Link>
                    </form>
                </div>
            </Container>
        </section>
    );
};

export default Login;
