import React, { FormEvent, useEffect, useRef, useState } from "react";

import Container from "@/components/ui/Container";
import classes from "./Registration.module.scss";
import { API } from "@/api/cpdefAPI";
import PhoneInput from "react-phone-input-2";
import { Gender } from "@/enums/gender.enum";
import { TShirtSize } from "@/enums/t-shirt-size.enum";
import toast from "@/utils/toast";
import { useRouter } from "next/router";
import Link from "next/link";

const Registration = () => {
    const router = useRouter();

    const ruleCheckboxRef = useRef<HTMLInputElement>(null);

    const [firstname, setFirstname] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [phone, setPhone] = useState<string>("+7");
    const [educationInstitution, setEducationInstitution] =
        useState<string>("");
    const [uin, setUin] = useState<string>("");
    const [yearOfEducation, setYearOfEducation] = useState<number>(0);
    const [gender, setGender] = useState<Gender>(Gender.NON_BINARY);
    const [tShirtSize, setTShirtSize] = useState<TShirtSize>(TShirtSize.M);

    const getAvatarSrc = () => {
        switch (gender) {
            case Gender.MAN:
                return "images/blue_avatar.png";
            case Gender.WOMAN:
                return "images/pink_avatar.png";
            case Gender.NON_BINARY:
                return "images/purple_avatar.png";
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (ruleCheckboxRef.current?.checked == false) {
            toast.warn(
                "Вы должны быть согласны с политикой конфиденциальности"
            );
            return;
        }

        API.signUp({
            email,
            first_name: firstname,
            gender,
            last_education_institution: educationInstitution,
            last_name: surname,
            phone_number: phone,
            t_shirt_size: tShirtSize,
            uin: uin,
            year_of_education: yearOfEducation,
            password,
        })
            .then((_) => {
                API.login(email, password)
                    .then((_) => {
                        API.registerChampionship()
                            .then((_) => {
                                toast.success("Успешно зарегистрирован");
                                router.push("/");
                            })
                            .catch((err) => {
                                toast.errorFromError(err);
                            });
                    })
                    .catch((err) => {
                        toast.errorFromError(err);
                    });
            })
            .catch((err) => {
                toast.errorFromError(err);
            });
    };

    useEffect(() => {}, []);

    return (
        <section className={classes.registration}>
            <Container>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <div className={classes.form__group}>
                        <div
                            className={[
                                classes.registration__avatar,
                                classes.form__group_item,
                            ].join(" ")}
                        >
                            <img src={getAvatarSrc()} />
                        </div>

                        <div className={classes.form__group_item}>
                            <label
                                className={[
                                    classes.form__label,
                                    classes.radio,
                                ].join(" ")}
                            >
                                Размер футболки*
                            </label>
                            <div className={classes.form__radiobuttons}>
                                <div className={classes.form__group_item}>
                                    <input
                                        type="radio"
                                        checked={TShirtSize.S == tShirtSize}
                                        onChange={(_) =>
                                            setTShirtSize(TShirtSize.S)
                                        }
                                    />
                                    <label className={classes.radio}>S</label>
                                </div>
                                <div className={classes.form__group_item}>
                                    <input
                                        type="radio"
                                        checked={TShirtSize.M == tShirtSize}
                                        onChange={(_) =>
                                            setTShirtSize(TShirtSize.M)
                                        }
                                    />
                                    <label className={classes.radio}>M</label>
                                </div>
                                <div className={classes.form__group_item}>
                                    <input
                                        type="radio"
                                        checked={TShirtSize.L == tShirtSize}
                                        onChange={(_) =>
                                            setTShirtSize(TShirtSize.L)
                                        }
                                    />
                                    <label className={classes.radio}>L</label>
                                </div>
                                <div className={classes.form__group_item}>
                                    <input
                                        type="radio"
                                        checked={TShirtSize.XL == tShirtSize}
                                        onChange={(_) =>
                                            setTShirtSize(TShirtSize.XL)
                                        }
                                    />
                                    <label className={classes.radio}>XL</label>
                                </div>
                            </div>
                        </div>

                        <div className={classes.form__group_item}>
                            <label
                                className={[
                                    classes.form__label,
                                    classes.radio,
                                ].join(" ")}
                            >
                                Выберите пол*
                            </label>
                            <div className={classes.form__radiobuttons}>
                                <div className={classes.form__group_item}>
                                    <input
                                        type="radio"
                                        checked={Gender.WOMAN == gender}
                                        onChange={(_) =>
                                            setGender(Gender.WOMAN)
                                        }
                                    />
                                    <label className={classes.radio}>F</label>
                                </div>
                                <div className={classes.form__group_item}>
                                    <input
                                        type="radio"
                                        checked={Gender.MAN == gender}
                                        onChange={(_) => setGender(Gender.MAN)}
                                    />
                                    <label className={classes.radio}>M</label>
                                </div>
                                <div className={classes.form__group_item}>
                                    <input
                                        type="radio"
                                        checked={Gender.NON_BINARY == gender}
                                        onChange={(_) =>
                                            setGender(Gender.NON_BINARY)
                                        }
                                    />
                                    <label className={classes.radio}>N-B</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={classes.form__group}>
                        <div className={classes.form__group_item}>
                            <label className={classes.form__label}>Имя*</label>
                            <input
                                className={classes.form__input}
                                type="text"
                                value={firstname}
                                onChange={(event) =>
                                    setFirstname(event.currentTarget.value)
                                }
                                required
                            />
                        </div>
                        <div className={classes.form__group_item}>
                            <label className={classes.form__label}>
                                Фамилия*
                            </label>
                            <input
                                className={classes.form__input}
                                type="text"
                                value={surname}
                                onChange={(event) =>
                                    setSurname(event.currentTarget.value)
                                }
                                required
                            />
                        </div>
                        <div className={classes.form__group_item}>
                            <label className={classes.form__label}>
                                Электронная почта*
                            </label>
                            <input
                                className={classes.form__input}
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.currentTarget.value)
                                }
                                required
                            />
                        </div>
                        <div className={classes.form__group_item}>
                            <label className={classes.form__label}>
                                Пароль*
                            </label>
                            <input
                                className={classes.form__input}
                                type="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.currentTarget.value)
                                }
                                minLength={8}
                                required
                            />
                        </div>
                        <div className={classes.form__group_item}>
                            <label className={classes.form__label}>ИИН*</label>
                            <input
                                className={classes.form__input}
                                type="text"
                                value={uin}
                                onChange={(event) =>
                                    setUin(event.currentTarget.value)
                                }
                                minLength={12}
                                maxLength={12}
                                required
                            />
                        </div>
                        <div className={classes.form__group_item}>
                            <label className={classes.form__label}>
                                Телефон*
                            </label>
                            <PhoneInput
                                inputClass={classes.form__input}
                                country={"kz"}
                                prefix="+"
                                specialLabel=""
                                onChange={(value) => {
                                    if (value[0] != "+") {
                                        value = "+" + value;
                                    }
                                    if (value[1] != "7") {
                                        value =
                                            value[0] + "7" + value.substring(1);
                                    }
                                    setPhone(value);
                                }}
                                placeholder="+7 (777) 777-77-77"
                                value={phone}
                            />
                        </div>
                        <div className={classes.form__group_item}>
                            <label className={classes.form__label}>
                                Учебное заведение*
                            </label>
                            <input
                                className={classes.form__input}
                                type="text"
                                value={educationInstitution}
                                onChange={(event) =>
                                    setEducationInstitution(
                                        event.currentTarget.value
                                    )
                                }
                                required
                            />
                        </div>
                        <div className={classes.form__group_item}>
                            <label className={classes.form__label}>
                                Год окончания*
                            </label>
                            <input
                                className={classes.form__input}
                                type="number"
                                value={yearOfEducation}
                                min={1900}
                                max={2300}
                                onChange={(event) =>
                                    setYearOfEducation(
                                        Number.parseInt(
                                            event.currentTarget.value
                                        )
                                    )
                                }
                                required
                            />
                        </div>
                    </div>
                    <div className={classes.form__group}>
                        <div className={classes.form__checkbox}>
                            <input
                                ref={ruleCheckboxRef}
                                type="checkbox"
                                defaultChecked={false}
                            />
                            <Link href={"#"} target={"_blank"}>
                                Согласен с политикой конфиденциальности
                            </Link>
                        </div>
                        <button type="submit">Зарегистрироваться</button>
                    </div>
                </form>
            </Container>
        </section>
    );
};

export default Registration;
