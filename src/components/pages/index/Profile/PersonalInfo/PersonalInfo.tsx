import React, { FormEvent, useEffect, useState } from "react";

import Container from "@/components/ui/Container";
import classes from "./PersonalInfo.module.scss";
import { API } from "@/api/cpdefAPI";
import { Gender } from "@/enums/gender.enum";
import { TShirtSize } from "@/enums/t-shirt-size.enum";
import icons from "@/utils/icons";

const PersonalInfo = () => {
    const [firstname, setFirstname] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [educationInstitution, setEducationInstitution] =
        useState<string>("");
    const [uin, setUin] = useState<string>("");
    const [yearOfEducation, setYearOfEducation] = useState<number>(0);
    const [gender, setGender] = useState<Gender>(Gender.NON_BINARY);
    const [tShirtSize, setTShirtSize] = useState<TShirtSize>(TShirtSize.M);

    const getAvatarSrc = () => {
        switch (gender) {
            case Gender.MAN:
                return icons.blueAvatar.src;
            case Gender.WOMAN:
                return icons.pinkAvatar.src;
            case Gender.NON_BINARY:
                return icons.purpleAvatar.src;
        }
    };

    const fetchInfo = async () => {
        const res = await API.profileMe();

        setFirstname(res.first_name ?? "");
        setSurname(res.last_name ?? "");
        setEmail(res.email ?? "");
        setPhone(res.phone_number ?? "");
        setEducationInstitution(res.last_education_institution ?? "");
        setUin(res.uin ?? "");
        setYearOfEducation(res.year_of_education ?? 2023);
        setGender(res.gender ?? Gender.NON_BINARY);
        setTShirtSize(res.t_shirt_size ?? TShirtSize.M);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        API.updateProfileMe({
            email,
            first_name: firstname,
            gender,
            last_education_institution: educationInstitution,
            last_name: surname,
            phone_number: phone,
            t_shirt_size: tShirtSize,
            uin,
            year_of_education: yearOfEducation
        }).catch(err=>{
            const messages: string[] = err.response?.data?.message?.split('\n') ?? [];
            for(const message of messages) {
                alert(message.split(':')[0])
            }
        });
    }

    useEffect(() => {
        fetchInfo();
    }, []);

    return (
        <section className={classes.personalInfo}>
            <Container>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <div className={classes.form__group}>
                        <div
                            className={[
                                classes.personalInfo__avatar,
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
                            <label className={classes.form__label}>ИИН*</label>
                            <input
                                className={classes.form__input}
                                type="text"
                                value={uin}
                                onChange={(event) =>
                                    setUin(event.currentTarget.value)
                                }
                                required
                            />
                        </div>
                        <div className={classes.form__group_item}>
                            <label className={classes.form__label}>
                                Телефон*
                            </label>
                            {/* <PhoneInput
                                inputClass={classes.form__input}
                                country={"kz"}
                                prefix="+"
                                specialLabel=""
                                onChange={(value) => setPhone(value)}
                                value={phone}
                            /> */}
                            <input
                                className={classes.form__input}
                                type="tel"
                                prefix="+7"
                                value={phone}
                                onChange={(event) =>
                                    setPhone(
                                        event.currentTarget.value
                                    )
                                }
                                required
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
                        <button type="submit">Сохранить</button>
                    </div>
                </form>
            </Container>
        </section>
    );
};

export default PersonalInfo;
