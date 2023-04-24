import React, { FormEvent, useEffect, useRef, useState } from "react";

import Container from "@/components/ui/Container";
import classes from "./Registration.module.scss";
import { API } from "@/api/cpdefAPI";
import PhoneInput from "react-phone-input-2";
import { Gender } from "@/enums/gender.enum";
import { TShirtSize } from "@/enums/t-shirt-size.enum";
import toast from "@/utils/toast";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import icons from "@/utils/icons";
import { EmploymentStatus } from "@/enums/employmentStatus";
import { RegionList, Region } from "@/interfaces/region";
import { login } from "@/store/account/thunk";
import { useAppDispatch } from "@/hooks/reduxHooks";

const Registration = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { t } = useTranslation();

    const ruleCheckboxRef = useRef<HTMLInputElement>(null);

    const [firstname, setFirstname] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repeatPassword, setRepeatPassword] = useState<string>("");
    const [isPasswordsEqual, setIsPasswordsEqual] = useState<boolean>(true);
    const [phone, setPhone] = useState<string>("+7");
    const [isCitizenOfKazakhstan, setIsCitizenOfKazakhstan] =
        useState<boolean>(false);
    const [employmentStatus, setEmploymentStatus] = useState<EmploymentStatus>(
        EmploymentStatus.NOT_WORKING_AND_STUDYING
    );
    const [employmentStatusPlace, setEmploymentStatusPlace] =
        useState<string>("");
    const [regionList, setRegionList] = useState<Region[]>([]);
    const employmentStatusList = [
        EmploymentStatus.NOT_WORKING_AND_STUDYING,
        EmploymentStatus.STUDYING,
        EmploymentStatus.WORKING,
    ];
    const [selectedRegion, setselectedRegion] = useState<number>(1);
    const [uin, setUin] = useState<string>("");

    const [gender, setGender] = useState<Gender>(Gender.WOMAN);
    const [tShirtSize, setTShirtSize] = useState<TShirtSize>(TShirtSize.M);
    const getAvatarSrc = () => {
        switch (gender) {
            case Gender.MAN:
                return icons.blueAvatar.src;
            case Gender.WOMAN:
                return icons.pinkAvatar.src;
            default:
                return icons.purpleAvatar.src;
        }
    };
    

    const fetchRegions = () => {
        API.fetchRegions()
            .then((res) => {
                setRegionList(res.results);
            })
            .catch((err) => {
                toast.error(t("common:error"))
            });
    };

    useEffect(() => {
        fetchRegions();
    }, []);

    useEffect(() => {
        if (employmentStatus == EmploymentStatus.NOT_WORKING_AND_STUDYING) {
            setEmploymentStatusPlace("");
        }
    }, [employmentStatus]);

    const passConfirm = () => {
        setIsPasswordsEqual(password == repeatPassword);
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isPasswordsEqual == false) {
            return;
        }

        if (ruleCheckboxRef.current?.checked == false) {
            toast.warn(t("registration:warn"));
            return;
        }

        API.signUp({
            email,
            first_name: firstname,
            gender,
            last_name: surname,
            phone_number: phone,
            t_shirt_size: tShirtSize,
            uin: uin,
            password,
            citizen_of_kz: isCitizenOfKazakhstan,
            employment_status: employmentStatus,
            region_id: selectedRegion,
            place_of_study_of_work: employmentStatusPlace,
        })
            .then((_) => {
                dispatch(login({ email, password }))
                    .unwrap()
                    .then((_) => {
                        API.registerChampionship()
                            .then((_) => {
                                toast.success(t("registration:success"));
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
                    {/* GROUP 1 */}
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
                                {t("registration:choose-t-shirt-size")}
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
                                {t("registration:choose-gender")}
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
                                    <label className={classes.radio}>{t("registration:woman")}</label>
                                </div>
                                <div className={classes.form__group_item}>
                                    <input
                                        type="radio"
                                        checked={Gender.MAN == gender}
                                        onChange={(_) => setGender(Gender.MAN)}
                                    />
                                    <label className={classes.radio}>{t("registration:man")}</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* GROUP 2 */}
                    <div className={classes.form__group}>
                        <div className={classes.form__group_item}>
                            <label className={classes.form__label}>
                                {t("registration:name")}
                            </label>
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
                                {t("registration:surname")}
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
                                {t("registration:email")}
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
                                {t("registration:password")}
                            </label>
                            <input
                                className={classes.form__input}
                                type="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.currentTarget.value)
                                }
                                onKeyUp={() =>
                                    passConfirm() 
                                }
                                minLength={8}
                                required
                            />
                        </div>
                        <div className={classes.form__group_item}>
                            <label className={classes.form__label}>
                                {t("registration:repeat-password")}
                            </label>
                            <input
                                className={classes.form__input}
                                type="password"
                                value={repeatPassword}
                                onChange={(event) =>
                                    setRepeatPassword(event.currentTarget.value)
                                }
                                onKeyUp={() =>
                                    passConfirm() 
                                }
                                minLength={8}
                                required
                            />
                        </div>
                        {!isPasswordsEqual ? 
                            (<>
                                <div className={classes.form__group_item}>
                                    <p className={[
                                                classes.form__warning,
                                                // classes.form__label,
                                            ].join(" ")
                                        }>
                                        {t("registration:password-does-not-match")}
                                    </p>
                                </div>
                            </>
                            ) : (
                                <></>
                            )
                        }

                        <div className={classes.form__group_item}>
                            <label className={classes.form__label}>
                                {t("registration:iin")}
                            </label>
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
                                {t("registration:telephone")}
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
                                {t("registration:is-citizen-of-RK")}
                            </label>
                            <div className={classes.form__radiobuttons}>
                                <div className={classes.form__group_item}>
                                    <input
                                        type="radio"
                                        checked={isCitizenOfKazakhstan}
                                        onChange={(_) =>
                                            setIsCitizenOfKazakhstan(true)
                                        }
                                    />
                                    <label className={classes.radio}>
                                        {t("registration:yes")}
                                    </label>
                                </div>
                                <div className={classes.form__group_item}>
                                    <input
                                        type="radio"
                                        checked={!isCitizenOfKazakhstan}
                                        onChange={(_) =>
                                            setIsCitizenOfKazakhstan(false)
                                        }
                                    />
                                    <label className={classes.radio}>
                                        {t("registration:no")}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className={classes.form__group_item}>
                            <p className={classes.registration__note}>
                                {t("registration:kvota-note-1")}
                                <br />
                                <br />
                                {t("registration:kvota-note-2")}
                            </p>
                        </div>
                        <div className={classes.form__group_item}>
                            <select
                                onChange={(e) => {
                                    setEmploymentStatus(
                                        e.target.value as EmploymentStatus
                                    );
                                }}
                                required
                                className={classes.form__select}
                            >
                                {employmentStatusList.map(
                                    (employmentStatus, index, self) => {
                                        return (
                                            <option
                                                key={index}
                                                value={employmentStatus}
                                                className={
                                                    classes.form__select_option
                                                }
                                            >
                                                {t(
                                                    "education-or-job:" +
                                                        employmentStatus
                                                )}
                                            </option>
                                        );
                                    }
                                )}
                            </select>
                        </div>
                        {employmentStatus !=
                        EmploymentStatus.NOT_WORKING_AND_STUDYING ? (
                            <>
                                <div className={classes.form__group_item}>
                                    <label className={classes.form__label}>
                                        {employmentStatus == EmploymentStatus.STUDYING ? 
                                            t("registration:education-place") : 
                                            t("registration:job-place")
                                        }
                                    </label>
                                    <input
                                        className={classes.form__input}
                                        type="education-or-job-place"
                                        value={employmentStatusPlace ?? ""}
                                        onChange={(event) =>
                                            setEmploymentStatusPlace(
                                                event.currentTarget.value
                                            )
                                        }
                                        required
                                    />
                                </div>
                                <div className={classes.form__group_item}>
                                    <label className={classes.form__label}>
                                        {employmentStatus == EmploymentStatus.STUDYING ? 
                                            t("registration:city-region-education") : 
                                            t("registration:city-region-job")
                                        }
                                    </label>
                                    <select
                                        onChange={(e) => {
                                            setselectedRegion(
                                                Number(e.target.value)
                                            );
                                        }}
                                        required
                                        className={classes.form__select}
                                    >
                                        {regionList.map(
                                            (region, index, self) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={region.id}
                                                        className={
                                                            classes.form__select_option
                                                        }
                                                    >
                                                        {t(
                                                            "regions:" +
                                                                region.name
                                                        )}
                                                    </option>
                                                );
                                            }
                                        )}
                                    </select>
                                </div>
                            </>
                        ) : (
                            <></>
                        )}
                        <div className={classes.form__checkbox}>
                            <input ref={ruleCheckboxRef} type={"checkbox"}></input>
                            <a href={"https://contest.cpfed.kz/media/%D0%9F%D0%BE%D0%BB%D0%B8%D1%82%D0%B8%D0%BA%D0%B0_%D0%BA%D0%BE%D0%BD%D1%84%D0%B8%D0%B4%D0%B5%D0%BD%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D0%B8_%D0%A0%D0%9E%D0%9E_%D0%A4%D0%A1%D0%9F_v1_1.pdf"} className={classes.form__label}>
                                {t("registration:political-agree")}
                            </a>
                        </div>
                        <button type="submit">
                            {t("registration:register")}
                        </button>
                    </div>
                </form>
            </Container>
        </section>
    );
};

export default Registration;
