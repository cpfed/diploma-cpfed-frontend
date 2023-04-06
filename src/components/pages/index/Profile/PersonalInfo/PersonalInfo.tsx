import React, { FormEvent, useEffect, useRef, useState } from "react";

import Container from "@/components/ui/Container";
import classes from "./PersonalInfo.module.scss";
import { API } from "@/api/cpdefAPI";
import PhoneInput from "react-phone-input-2";
import { Gender } from "@/enums/gender.enum";
import { TShirtSize } from "@/enums/t-shirt-size.enum";
import toast from "@/utils/toast";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import icons from "@/utils/icons";
import { EmploymentStatus } from "@/enums/employmentStatus";
import { Region } from "@/interfaces/region";

const PersonalInfo = () => {
    const router = useRouter();
    const { t } = useTranslation();

    const [isEditMode, setIsEditMode] = useState(false);

    const [firstname, setFirstname] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("+7");
    const [isCitizenOfKazakhstan, setIsCitizenOfKazakhstan] =
        useState<boolean>(false);
    const [employmentStatus, setEmploymentStatus] = useState<EmploymentStatus>(
        EmploymentStatus.NOT_WORKING_AND_STUDYING
    );
    const [employmentStatusPlace, setEmploymentStatusPlace] = useState<string>("");
    const [regionList, setRegionList] = useState<Region[]>([]);
    const employmentStatusList = [
        EmploymentStatus.NOT_WORKING_AND_STUDYING,
        EmploymentStatus.STUDYING,
        EmploymentStatus.WORKING,
    ]
    const [selectedRegion, setselectedRegion] = useState<number>(0);
    const [uin, setUin] = useState<string>("");

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

    const fetchRegions = () => {
        API.fetchRegions()
            .then((res) => {
                setRegionList(res.results);
            })
            .catch((err) => {
                toast.error(err);
            });
    }

    const fetchInfo = () => {
        API.profileMe()
        .then(res=>{
            setFirstname(res.first_name);
            setEmail(res.email);
            setEmploymentStatus(res.employment_status);
            setEmploymentStatusPlace(res.place_of_study_of_work);
            setGender(res.gender);
            setIsCitizenOfKazakhstan(res.citizen_of_kz);
            setPhone(res.phone_number);
            setSurname(res.last_name);
            setTShirtSize(res.t_shirt_size);
            setUin(res.uin);
            setselectedRegion(2);
        })
    }

    useEffect(() => { fetchRegions(); fetchInfo() }, []);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        API.updateProfileMe({
            citizen_of_kz: isCitizenOfKazakhstan,
            email,
            employment_status: employmentStatus,
            gender: gender,
            phone_number: phone,
            place_of_study_of_work: employmentStatusPlace,
            t_shirt_size: tShirtSize
        }).then(
            res=>{
                setEmail(res.email);
                setEmploymentStatus(res.employment_status);
                setEmploymentStatusPlace(res.place_of_study_of_work);
                setGender(res.gender);
                setIsCitizenOfKazakhstan(res.citizen_of_kz);
                setPhone(res.phone_number);
                setTShirtSize(res.t_shirt_size);
            }
        )
        .catch(err=>{
            toast.errorFromError(err);
            fetchInfo();
        })
        .finally(()=>{
            setIsEditMode(false);
        })
    };

    useEffect(() => { }, []);

    return (
        <section className={classes.personalInfo}>
            <Container>
                <form className={classes.form} onSubmit={handleSubmit}>
                    {/* GROUP 1 */}
                    <div className={classes.form__group}>
                        <div className={classes.form__group_itemhor} >
                            <img className={classes.personalInfo__pencil} src={icons.pencil.src} hidden={isEditMode}/>
                            <p className={classes.form__editor} onClick={()=>setIsEditMode(true)} hidden={isEditMode}>Редактировать</p>
                        </div>

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
                                {t("registration:choose-t-shirt-size")}
                            </label>
                            <div className={classes.form__radiobuttons}>
                                <div className={classes.form__group_item}>
                                    <input
                                        disabled={!isEditMode}

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
                                        disabled={!isEditMode}

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
                                        disabled={!isEditMode}

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
                                        disabled={!isEditMode}

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
                                        disabled={!isEditMode}

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
                                        disabled={!isEditMode}

                                        type="radio"
                                        checked={Gender.MAN == gender}
                                        onChange={(_) => setGender(Gender.MAN)}
                                    />
                                    <label className={classes.radio}>M</label>
                                </div>
                                <div className={classes.form__group_item}>
                                    <input
                                        disabled={!isEditMode}

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

                    {/* GROUP 2 */}
                    <div className={classes.form__group}>
                        <div className={classes.form__group_item}>
                            <label className={classes.form__label}>
                                {t("registration:name")}
                            </label>
                            <input
                                disabled={true}

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
                                disabled={true}

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
                                disabled={!isEditMode}

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
                                {t("registration:iin")}
                            </label>
                            <input
                                disabled={true}

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
                                disabled={!isEditMode}
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
                                        disabled={!isEditMode}

                                        type="radio"
                                        checked={isCitizenOfKazakhstan}
                                        onChange={(_) => setIsCitizenOfKazakhstan(true)}
                                    />
                                    <label className={classes.radio}>{t("registration:yes")}</label>
                                </div>
                                <div className={classes.form__group_item}>
                                    <input
                                        disabled={!isEditMode}

                                        type="radio"
                                        checked={!isCitizenOfKazakhstan}
                                        onChange={(_) => setIsCitizenOfKazakhstan(false)}
                                    />
                                    <label className={classes.radio}>{t("registration:no")}</label>
                                </div>
                            </div>
                        </div>
                        <div className={classes.form__group_item}>
                            <p className={classes.personalInfo__note}>
                                {t("registration:kvota-note-1")}
                                <br />
                                <br />
                                {t("registration:kvota-note-2")}
                            </p>
                        </div>
                        <div className={classes.form__group_item}>
                            <label className={classes.form__label}>
                                {t("registration:education-or-job")}
                            </label>
                            <select
                                disabled={!isEditMode}
                                onChange={(e) => {
                                    setEmploymentStatus(e.target.value as EmploymentStatus)
                                }}
                                required
                                className={classes.form__select}
                            >
                                {
                                    employmentStatusList.map((employmentStatus, index, self) => {
                                        return (
                                            <option
                                                key={index}
                                                value={employmentStatus}
                                                className={classes.form__select_option}
                                            >
                                                {t("education-or-job:" + employmentStatus)}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        {employmentStatus != EmploymentStatus.NOT_WORKING_AND_STUDYING ?
                            <>
                                <div className={classes.form__group_item}>
                                    <label className={classes.form__label}>
                                        {t("registration:education-or-job-place")}
                                    </label>
                                    <input
                                        disabled={!isEditMode}

                                        className={classes.form__input}
                                        type="education-or-job-place"
                                        value={employmentStatusPlace}
                                        onChange={(event) =>
                                            setEmploymentStatusPlace(event.currentTarget.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className={classes.form__group_item}>
                                    <label className={classes.form__label}>
                                        {t("registration:city-region")}
                                    </label>
                                    <select
                                        disabled={true}
                                        onChange={(e) => {
                                            setselectedRegion(Number(e.target.value))
                                        }}
                                        required
                                        className={classes.form__select}
                                        defaultValue={selectedRegion}
                                    >
                                        {
                                            regionList.map((region, index, self) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={region.id}
                                                        className={classes.form__select_option}
                                                    >
                                                        {t("regions:" + region.name)}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </> :
                            <>
                            </>}

                        <button type="submit" hidden={!isEditMode}>
                            {t("common:save")}
                        </button>
                    </div>
                </form>
            </Container>
        </section>
    );
};

export default PersonalInfo;
