import Container from "@/components/ui/Container";
import React, { FormEvent, useRef, useState } from "react";
import { API } from "@/api/cpdefAPI";

import classes from "./ForgotPassword.module.scss";
import useTranslation from "next-translate/useTranslation";
import toast from "@/utils/toast";
import { parseBackendError } from "@/utils/functions";

const ForgotPassword = () => {
    const { t } = useTranslation();
    const [isSent, setIsSent] = useState<boolean>(false);
    const emailRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        API.forgotPassword(emailRef.current!.value)
            .then((res) => {
                setIsSent(true);
            })
            .catch((err) => {
                toast.error(t("common:error"));
            });
    };

    return (
        <section className={classes.forgotPassword}>
            <Container>
                <div className={classes.forgotPassword}>
                    {!isSent ? (
                        <>
                            <p className={classes.forgotPassword__title}>
                                {t("forgot-password:restore-password")}
                            </p>
                            <form
                                onSubmit={handleSubmit}
                                className={classes.form}
                            >
                                <input
                                    type="email"
                                    ref={emailRef}
                                    placeholder={t("forgot-password:enter-email")}
                                    className={classes.form__input}
                                    minLength={8}
                                    required
                                />
                                <button
                                    type="submit"
                                    className={classes.form__button}
                                >
                                    {t("forgot-password:restore")}
                                </button>
                            </form>
                        </>
                    ) : (
                        <p className={classes.forgotPassword__subtitle}>
                            {t("forgot-password:letter")}
                        </p>
                    )}
                </div>
            </Container>
        </section>
    );
};

export default ForgotPassword;
