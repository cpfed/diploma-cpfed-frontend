import Container from "@/components/ui/Container";
import React, { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/router";
import { API } from "@/api/cpdefAPI";

import classes from "./ForgotPassword.module.scss";
import Link from "next/link";
import toast from "@/utils/toast";

const ForgotPassword = () => {
    const [isSent, setIsSent] = useState<boolean>(false);
    const emailRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        API.forgotPassword(emailRef.current!.value)
            .then((res) => {
                console.log(res);
                setIsSent(true);
            })
            .catch((err) => {
                toast.error(err);
            });
    };

    return (
        <section className={classes.forgotPassword}>
            <Container>
                <div className={classes.forgotPassword}>
                    {!isSent ? (
                        <>
                            <p className={classes.forgotPassword__title}>
                                Вооставновить пароль
                            </p>
                            <form
                                onSubmit={handleSubmit}
                                className={classes.form}
                            >
                                <input
                                    onError={() => console.log("ERROR!!")}
                                    type="email"
                                    ref={emailRef}
                                    placeholder="Введите email для восстановления пароля"
                                    className={classes.form__input}
                                    minLength={8}
                                    required
                                />
                                <button
                                    type="submit"
                                    className={classes.form__button}
                                >
                                    Восстановить
                                </button>
                            </form>
                        </>
                    ) : (
                        <p className={classes.forgotPassword__subtitle}>
                            Письмо с инструкцией по восстановлению пароля было
                            отослано на ваш email
                        </p>
                    )}
                </div>
            </Container>
        </section>
    );
};

export default ForgotPassword;
