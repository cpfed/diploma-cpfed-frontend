import Container from "@/components/ui/Container";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { API } from "@/api/cpdefAPI";

import classes from "./Recover.module.scss";
import toast from "@/utils/toast";
import useTranslation from "next-translate/useTranslation";

const Recover = () => {
    const router = useRouter();
    const { t } = useTranslation();

    useEffect(() => {
        const { id } = router.query;

        API.checkRecoveryPasswordId(id as string).catch((err) => {
            toast.error(t("recover:error-recovery"));
            router.push("/");
        });
    }, []);


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (passwordRef.current?.value != passwordRepeatRef.current?.value) {
            passwordRepeatRef.current?.focus();
            toast.error(t("recover:error-password-missmatch"));
            return;
        }

        const { id } = router.query;
        API.recoverPassword(
            id as string,
            passwordRef.current!.value,
            passwordRepeatRef.current!.value
        )
            .then((res) => {
                console.log(res);
                toast.success(t("recover:success"));
                router.push("/login");
            })
            .catch((err) => {
                console.log(err);
                toast.error(t("recover:error-recovery"));
            });
    };

    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordRepeatRef = useRef<HTMLInputElement>(null);

    return (
        <section className={classes.recover}>
            <Container>
                <div className={classes.recover}>
                    <p className={classes.recover__title}>
                        {t("recover:title")}
                    </p>

                    <form onSubmit={handleSubmit} className={classes.form}>
                        <input
                            onError={() => console.log("ERROR!!")}
                            type="password"
                            ref={passwordRef}
                            placeholder={t("recover:enter-password")}
                            className={classes.form__input}
                            minLength={8}
                            required
                        />
                        <input
                            type="password"
                            ref={passwordRepeatRef}
                            placeholder={t("recover:re-enter-password")}
                            className={classes.form__input}
                            minLength={8}
                            required
                        />
                        <button type="submit" className={classes.form__button}>
                            {t("recover:change-password")}
                        </button>
                    </form>
                </div>
            </Container>
        </section>
    );
};

export default Recover;
