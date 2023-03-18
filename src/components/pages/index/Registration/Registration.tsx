import React from "react";
import { FormEvent, useRef, useState } from "react";
import Container from "@/components/ui/Container";

import PhoneInput from "react-phone-input-2";
// import 'react-phone-input-2/lib/style.css'

import classes from "./Registration.module.scss";

const Registration = () => {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("HELLO BRO: " + emailRef.current?.value);
        const data = {
            uin: "string",
            email: emailRef.current?.value,
            phone_number: phoneNumber,
            year_of_education: yearOfEducationRef.current?.value,
            t_shirt_size: tShirtSizeRef.current?.value,
            password: passwordRef.current?.value,
        };
        const JSONdata = JSON.stringify(data);

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSONdata,
        };

        fetch(
            "http://localhost:8000/api/authentication/v1/sign-up/",
            options
        ).then(response=>{
            alert('successfully created')
            console.log(response)
        }).catch(err=>{
            alert(err)
        })
    };

    const uinRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const yearOfEducationRef = useRef<HTMLInputElement>(null);
    const tShirtSizeRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordRepeatRef = useRef<HTMLInputElement>(null);

    return (
        <section className={classes.registration} id="registration">
            <Container>
                <div className={classes.registration__form}>
                    <p className={classes.registration__heading}>
                        Зарегистрироваться
                    </p>

                    <form onSubmit={handleSubmit} className={classes.form}>
                        <div className={classes.form__item}>
                            <input
                                id="uin"
                                type="text"
                                name="uin"
                                ref={uinRef}
                                placeholder="ИИН"
                                className={classes.form__input}
                                required
                                minLength={12}
                                maxLength={12}
                            />
                        </div>
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
                            <PhoneInput
                                inputClass={classes.form__input}
                                country={"kz"}
                                prefix="+"
                                value={phoneNumber}
                                onChange={(phone) => setPhoneNumber(phone)}
                                specialLabel=""
                                
                            />
                        </div>
                        <div className={classes.form__item}>
                            <input
                                id="yearOfEducationRef"
                                type="number"
                                name="yearOfEducationRef"
                                ref={yearOfEducationRef}
                                placeholder="Год обучения"
                                className={classes.form__input}
                                required
                                title="ASD"
                                min={1900}
                                max={2023}
                            />
                        </div>
                        <div className={classes.form__item}>
                            <input
                                id="tShirtSizeRef"
                                type="text"
                                name="tShirtSizeRef"
                                ref={tShirtSizeRef}
                                placeholder="Размер футболки"
                                className={classes.form__input}
                                required
                                title="Sizes: S, M, L, XL"
                                pattern="^S|M|L|XL$"
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
                        <div className={classes.form__item}>
                            <input
                                id="passwordRepeat"
                                type="password"
                                name="passwordRepeat"
                                ref={passwordRepeatRef}
                                placeholder="Повторите пароль"
                                minLength={8}
                                className={classes.form__input}
                                required
                            />
                        </div>
                        <button type="submit" className={classes.form__button}>
                            Отправить
                        </button>
                    </form>
                </div>
            </Container>
        </section>
    );
};

export default Registration;
