import React, { useEffect, useState } from "react";

import Container from "@/components/ui/Container";
import classes from "./Olympiads.module.scss";
import { API } from "@/api/cpdefAPI";

import { ContestPlatform } from "@/interfaces/contestPlatforms";
import useTranslation from "next-translate/useTranslation";
import { NewUserOlympiad, UserOlympiad, UpdatedUserOlympiad } from "@/interfaces/userOlympiad";
import { Achievement } from "@/enums/achievement.enum";

const Olympiads = () => {
    const defaultState = { id: 0, name: "", achievement: "", year: 2000 } as NewUserOlympiad;
    const [fetchedUserOlympiadList, setFetchedUserOlympiadList] = useState<UserOlympiad[]>();
    const [userOlympiadList, setUserOlympiadList] = useState<NewUserOlympiad[]>([]);
    const [achievements, setAchievements] = useState<Achievement[]>([
        Achievement.GOLD,
        Achievement.SILVER,
        Achievement.BRONZE,
        Achievement.PARTICIPANT,
    ]);

    const { t } = useTranslation();

    const resetForm = async () => {
        setUserOlympiadList([]);
    }

    const handleUpdate = () => {
        const newArr = [...userOlympiadList];
        setUserOlympiadList(newArr);
    }

    const handleFetchedUpdate = () => {
        if (fetchedUserOlympiadList !== undefined) {
            const newArr = [...fetchedUserOlympiadList];
            setFetchedUserOlympiadList(newArr);
        }
    }

    const handleAdd = () => {
        const newArr = [...userOlympiadList];
        newArr.push(defaultState);
        setUserOlympiadList(newArr)
    }

    const handleCancel = () => {
        const newArr = [...userOlympiadList];
        if (newArr.length === 0) {
            return;
        }
        newArr.pop();
        setUserOlympiadList(newArr);
    }

    const setIsEditing = (index: number, isEditing: boolean) => {
        if (fetchedUserOlympiadList != undefined) {
            fetchedUserOlympiadList[index].isEditing = isEditing;
            const newArr = [...fetchedUserOlympiadList]
            setFetchedUserOlympiadList(newArr);
        }
    }

    const fetchUserOlympiadList = async () => {
        API.fetchUserOlympiadList().
            then((res) => {
                setFetchedUserOlympiadList(res.results);
            }).
            catch((error) => {
                console.log(error);
            })
    }

    const addUserOlympiadList = async () => {
        event!.preventDefault();
        API.addUserOlympiadList(userOlympiadList)
            .then(() => {
                resetForm();
                fetchUserOlympiadList();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const updateUserOlympiad = (id: number, name: string, achievement: string, year: number) => {
        event!.preventDefault();
        API.updateUserOlympiad(new class implements UpdatedUserOlympiad {
            id = id
            name = name
            achievement = achievement
            year = year
        }())
            .then(() => {

            }).catch((error) => {
                console.log(error);
            })
    }

    const deleteUserOlympiad = (id: number) => {
        API.deleterUserOlympiad(id)
            .then(() => {
                fetchUserOlympiadList();
            }).catch((error) => {
                console.log(error);
            })
    }
    // add edit and delete functionality of existing olympiads
    const modifyUserOlymiad = (isEditing: boolean) => {
        return (
            <form onSubmit={() => {
                addUserOlympiadList();
            }
            }>
                {userOlympiadList.map((userOlympiad, index, self) => {
                    return (
                        <div className={classes.olympiads__container} key={index}>
                            <div className={classes.olympiads__subcontainer}>
                                <label
                                    htmlFor="name"
                                    className={classes.olympiads__label}
                                >
                                    {t("profile-olympiads:olympiad-name")}
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={userOlympiadList[index].name}
                                    onChange={(event) => {
                                        (isEditing ? () => {

                                        } : () => {
                                            userOlympiadList[index].name = event.currentTarget.value;
                                            handleUpdate();
                                        })()
                                    }}
                                    placeholder={t("profile-olympiads:olympiad-name")}
                                    className={classes.olympiads__input}
                                    required
                                />
                            </div>
                            <div className={classes.olympiads__subcontainer}>
                                <label
                                    htmlFor="name"
                                    className={classes.olympiads__label}
                                >
                                    {t("profile-olympiads:achievement")}
                                </label>
                                <select
                                    onChange={(e) => {
                                        (isEditing ? () => {

                                        } : () => {
                                            userOlympiadList[index].achievement = e.target.value;
                                            handleUpdate();
                                        })()
                                    }}
                                    required
                                    className={classes.olympiads__select}>
                                    <option
                                        disabled
                                        selected
                                        hidden
                                        value=""
                                        className={classes.olympiads__select_option}
                                    >
                                        -- select an option --
                                    </option>
                                    {
                                        achievements.map((achievement, index2, self) => {
                                            return (
                                                <option
                                                    key={index2}
                                                    value={achievement}
                                                    className={classes.olympiads__select_option}
                                                >
                                                    {achievement}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className={classes.olympiads__subcontainer}>
                                <label
                                    htmlFor="year"
                                    className={classes.olympiads__label}
                                >
                                    {t("profile-olympiads:year")}
                                </label>
                                <input
                                    id="year"
                                    name="year"
                                    type="number"
                                    min={1900}
                                    max={2300}
                                    value={userOlympiadList[index].year}
                                    onChange={(event) => {
                                        (isEditing ? () => {

                                        } : () => {
                                            userOlympiadList[index].year = event.currentTarget.valueAsNumber;
                                            handleUpdate();
                                        })()
                                    }}
                                    placeholder={t("profile-olympiads:year")}
                                    className={classes.olympiads__input}
                                    required
                                />
                            </div>
                        </div>
                    )
                })}

                {userOlympiadList.length != 0 || isEditing ? (
                    <div className={classes.buttons}>
                        <div className={classes.buttons__container}>
                            <button
                                type="submit"
                                className={classes.buttons__save}>
                                {t("common:save")}
                            </button>
                            <button
                                onClick={handleCancel}
                                className={classes.buttons__cancel}>
                                {t("common:cancel")}
                            </button>
                        </div>
                    </div>
                )
                    : (
                        <></>
                    )
                }
            </form>
        )
    }

    useEffect(() => { fetchUserOlympiadList() }, [])

    return (
        <section className={classes.handles}>
            <Container>
                <div className={classes.handles}>
                    <div className={classes.olympiads__main_container}>
                        <div className={classes.note}>
                            <p className={classes.note__text}>{t("profile:experience")}</p>
                        </div>
                        <p className={classes.olympiads__title}>{t("profile-olympiads:olympiads")}</p>
                        {fetchedUserOlympiadList?.map((userOlympiad, index, self) => {
                            return (
                                <div key={index} className={[
                                    classes.editable,
                                    userOlympiad.isEditing ? classes.is_editing : undefined,
                                ].join(" ")}>
                                    {!userOlympiad.isEditing ? (
                                        <>
                                            <span className={classes.editable__text}>{userOlympiad.year}</span>
                                            <span className={classes.editable__text}>{userOlympiad.name}</span>
                                            <span className={classes.editable__text}>{userOlympiad.achievement}</span>
                                            <div className={classes.editable__images_box}>
                                                <img
                                                    src="/images/edit_button.png"
                                                    onClick={() => {
                                                        setIsEditing(index, true);
                                                    }}
                                                    className={classes.editable__img}
                                                >
                                                </img>
                                                <img
                                                    src="/images/delete_button.png"
                                                    onClick={() => {
                                                        deleteUserOlympiad(fetchedUserOlympiadList[index].id);
                                                    }}
                                                    className={classes.editable__img}
                                                >
                                                </img>
                                            </div>
                                        </>
                                    ) : (
                                        <form onSubmit={() => {
                                            updateUserOlympiad(
                                                userOlympiad.id,
                                                userOlympiad.name,
                                                userOlympiad.achievement,
                                                userOlympiad.year
                                            )
                                            setIsEditing(index, false);
                                        }} className={classes.form}>
                                            <div className={classes.olympiads__subcontainer}>
                                                <label
                                                    htmlFor="name"
                                                    className={classes.olympiads__label}
                                                >
                                                    {t("profile-olympiads:olympiad-name")}
                                                </label>
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    value={fetchedUserOlympiadList[index].name}
                                                    onChange={(event) => {
                                                        fetchedUserOlympiadList[index].name = event.currentTarget.value;
                                                        handleFetchedUpdate();
                                                    }}
                                                    placeholder={t("profile-olympiads:olympiad-name")}
                                                    className={classes.olympiads__input}
                                                    required
                                                />
                                            </div>
                                            <div className={classes.olympiads__subcontainer}>
                                                <label
                                                    htmlFor="name"
                                                    className={classes.olympiads__label}
                                                >
                                                    {t("profile-olympiads:achievement")}
                                                </label>
                                                <select
                                                    onChange={(e) => {
                                                        fetchedUserOlympiadList[index].achievement = e.target.value;
                                                        handleFetchedUpdate();
                                                    }}
                                                    required
                                                    className={classes.olympiads__select}>
                                                    <option
                                                        disabled
                                                        selected
                                                        hidden
                                                        value=""
                                                        className={classes.olympiads__select_option}
                                                    >
                                                        -- select an option --
                                                    </option>
                                                    {
                                                        achievements.map((achievement, index2, self) => {
                                                            return (
                                                                <option
                                                                    key={index2}
                                                                    value={achievement}
                                                                    className={classes.olympiads__select_option}
                                                                >
                                                                    {achievement}
                                                                </option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className={classes.olympiads__subcontainer}>
                                                <label
                                                    htmlFor="name"
                                                    className={classes.olympiads__label}
                                                >
                                                    {t("profile-olympiads:olympiad-name")}
                                                </label>
                                                <input
                                                    id="year"
                                                    name="year"
                                                    type="number"
                                                    min={1900}
                                                    max={2300}
                                                    value={fetchedUserOlympiadList[index].year}
                                                    onChange={(event) => {
                                                        fetchedUserOlympiadList[index].year = event.currentTarget.valueAsNumber;
                                                        handleFetchedUpdate();
                                                    }}
                                                    placeholder={t("profile-olympiad:year")}
                                                    className={classes.olympiads__input}
                                                    required
                                                />
                                            </div>
                                            <div className={classes.buttons}>
                                                <div className={classes.buttons__container}>
                                                    <button
                                                        type="submit"
                                                        className={classes.buttons__save}>
                                                        {t("common:save")}
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setIsEditing(index, false);
                                                        }}
                                                        className={classes.buttons__cancel}>
                                                        {t("common:cancel")}
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            )
                        })}

                        {modifyUserOlymiad(false)}

                        <div className={classes.add}>
                            <button
                                onClick={handleAdd}
                                className={classes.add__button}
                            >
                                {t("common:add")}
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Olympiads;