import React, { useEffect, useState } from "react";

import Container from "@/components/ui/Container";
import classes from "./Handles.module.scss";
import { API } from "@/api/cpdefAPI";

import { ContestPlatform } from "@/interfaces/contestPlatforms";
import useTranslation from "next-translate/useTranslation";
import { NewUserToPlatform, UserToPlatform, UpdatedUserToPlatform } from "@/interfaces/userToPlatform";

const Handles = () => {
    const defaultState = { platform_id: 0, handle: "" } as NewUserToPlatform
    const [fetchedUserToPlatformList, setFetchedUserToPlatformList] = useState<UserToPlatform[]>();
    const [userToPlatformList, setUserToPlatformList] = useState<NewUserToPlatform[]>([]);
    const [platforms, setPlatforms] = useState<ContestPlatform[]>([]);

    const { t } = useTranslation();

    const resetForm = async () => {
        setUserToPlatformList([]);
    }

    const handleUpdate = () => {
        const newArr = [...userToPlatformList];
        setUserToPlatformList(newArr);
    }

    const handleAdd = () => {
        const newArr = [...userToPlatformList];
        newArr.push(defaultState);
        setUserToPlatformList(newArr)
    }

    const handleCancel = () => {
        const newArr = [...userToPlatformList];
        if (newArr.length === 0) {
            return;
        }
        newArr.pop();
        setUserToPlatformList(newArr);
    }

    const fetchPlatforms = async () => {
        API.getContestPlatforms()
            .then((res) => {
                setPlatforms(res);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const fetchUserToPlatformList = async () => {
        API.fetchUserToPlatformList().
            then((res) => {
                setFetchedUserToPlatformList(res.results);
            }).
            catch((error) => {
                console.log(error);
            })
    }

    const addUserToPlatformList = async () => {
        API.addUserToPlatformList(userToPlatformList)
            .then(() => {
                resetForm();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const updateUserToPlatform = (id: number, handle: string) => {
        event!.preventDefault();
        console.log(id, handle);
        API.updateUserToPlatform(new class implements UpdatedUserToPlatform {
            id = id;
            handle = handle;
        }())
            .then(() => {

            }).catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => { fetchPlatforms() }, [])
    useEffect(() => { fetchUserToPlatformList() }, [])

    return (
        <section className={classes.handles}>
            <Container>
                <div className={classes.handles}>
                    <div className={classes.handles__main_container}>
                        <p className={classes.handles__title}>{t("profile-experience-handles:handles")}</p>
                        {fetchedUserToPlatformList?.map((userToPlatform, index, self) => {
                            return (
                                <div className={[
                                    classes.editable,
                                    userToPlatform.isEditing ? classes.is_editing : undefined,
                                ].join(" ")}>
                                    <span className={[
                                    classes.editable__text,
                                    userToPlatform.isEditing ? classes.is_editing__text : undefined,
                                ].join(" ")}>{userToPlatform.platform.name}</span>
                                    {!userToPlatform.isEditing ? (
                                        <>
                                            <span className={classes.editable__text}>{userToPlatform.handle}</span>
                                            <img
                                                src="images/edit_button.png"
                                                onClick={() => {
                                                    fetchedUserToPlatformList[index].isEditing = true;
                                                    const newArr = [...fetchedUserToPlatformList]
                                                    setFetchedUserToPlatformList(newArr);
                                                }}
                                                className={classes.editable__img}
                                            >
                                            </img>
                                        </>
                                    ) : (
                                        <form onSubmit={() => {
                                                updateUserToPlatform(
                                                    userToPlatform.id,
                                                    userToPlatform.handle
                                                )
                                                fetchedUserToPlatformList[index].isEditing = false;
                                                const newArr = [...fetchedUserToPlatformList]
                                                setFetchedUserToPlatformList(newArr);
                                            }} className={classes.form}>
                                            <div className={classes.handles__subcontainer}>
                                                <label
                                                    htmlFor="name"
                                                    className={classes.handles__label}
                                                >
                                                    {t("profile-experience-handles:handle")}
                                                </label>
                                                <input
                                                    id="handle"
                                                    name="handle"
                                                    type="text"
                                                    value={fetchedUserToPlatformList[index].handle}
                                                    onChange={(event) => {
                                                        fetchedUserToPlatformList[index].handle = event.currentTarget.value;
                                                        handleUpdate();
                                                    }}
                                                    placeholder={t("profile-experience-handles:handle")}
                                                    className={classes.handles__input}
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
                                                            fetchedUserToPlatformList[index].isEditing = false;
                                                            const newArr = [...fetchedUserToPlatformList]
                                                            setFetchedUserToPlatformList(newArr);
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
                        <form onSubmit={addUserToPlatformList}>
                            {userToPlatformList.map((userToPlatform, index, self) => {
                                return (
                                    <div className={classes.handles__container}>
                                        <div className={classes.handles__subcontainer}>
                                            <label
                                                htmlFor="name"
                                                className={classes.handles__label}
                                            >
                                                {t("profile-experience-handles:platform-name")}
                                            </label>
                                            <select
                                                onChange={(e) => {
                                                    userToPlatformList[index].platform_id = parseInt(e.target.value);
                                                    handleUpdate();
                                                }}
                                                required
                                                className={classes.handles__select}>
                                                <option
                                                    disabled
                                                    selected
                                                    hidden
                                                    value=""
                                                    className={classes.handles__select_option}
                                                >
                                                    -- select an option --
                                                </option>
                                                {
                                                    platforms.map((platform, index, self) => {
                                                        return (
                                                            <option
                                                                key={index}
                                                                value={platform.id}
                                                                className={classes.handles__select_option}
                                                            >
                                                                {platform.name}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className={classes.handles__subcontainer}>
                                            <label
                                                htmlFor="name"
                                                className={classes.handles__label}
                                            >
                                                {t("profile-experience-handles:handle")}
                                            </label>
                                            <input
                                                id="handle"
                                                name="handle"
                                                type="text"
                                                value={userToPlatformList[index].handle}
                                                onChange={(event) => {
                                                    userToPlatformList[index].handle = event.currentTarget.value;
                                                    handleUpdate();
                                                }}
                                                placeholder={t("profile-experience-handles:handle")}
                                                className={classes.handles__input}
                                                required
                                            />
                                        </div>
                                    </div>
                                )
                            })}

                            {userToPlatformList.length != 0 ? (
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

export default Handles;