import Container from "@/components/ui/Container";
import React, { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/router";
import { API } from "@/api/cpdefAPI";

import classes from "./Login.module.scss";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

const Login = () => {
    const router = useRouter();
    const { t } = useTranslation();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsIncorrect(false);

        API.login(emailRef.current?.value, passwordRef.current?.value)
            .then((res) => {
                router.push("/profile");
            })
            .catch((error) => {
                setIsIncorrect(true);
            });
    };

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [isIncorrect, setIsIncorrect] = useState(false);

    return (
        <section className={classes.login}>
            <Container>
                <div className={classes.login}>
                    <p className={classes.login__title}>{t("login:title")}</p>

                    <form onSubmit={handleSubmit} className={classes.form}>
                        {isIncorrect ? (
                            <p className={classes.login__message}>
                                {t("login:incorrect")}
                            </p>
                        ) : undefined}
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
