import React, { FormEvent, useRef } from "react";
import Link from "next/link";

import Container from "@/components/ui/Container";

import classes from "./SignUp.module.scss";
import useTranslation from "next-translate/useTranslation";

// depricated
const SignUp = () => {
    const { t } = useTranslation();

    const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // API.signUp(emailRef.current!.value, passwordRef.current!.value)
        // .then(_=>router.push('/login'))
        // .catch(_=>console.log)
    }

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    return (
        <section className={classes.signUp}>
            <Container>
                <div className={classes.signUp}>
                    <p className={classes.signUp__title}>{t("sign-up:registration")}</p>

                    <form onSubmit={handleSubmit} className={classes.form}>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            ref={emailRef}
                            placeholder={t("sign-up:enter-email")}
                            className={classes.form__input}
                            required
                        />
                        <input
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordRef}
                            placeholder={t("sign-up:enter-password")}
                            className={classes.form__input}
                            required
                        />
                        <button type="submit" className={classes.form__button}>
                            {t("sign-up:register")}
                        </button>
                        <Link className={classes.signUp__extension} href="/login">{t("sign-up:account-already-exists")}</Link>
                    </form>
                </div>
            </Container>
        </section>
    );
};

export default SignUp;
