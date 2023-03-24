import React, { useEffect, useState } from "react";

import Container from "@/components/ui/Container";
import classes from "./Handles.module.scss";
import { API } from "@/api/cpdefAPI";

import { ContestPlatform } from "@/interfaces/contestPlatforms";
import useTranslation from "next-translate/useTranslation";
import { UserToPlatform } from "@/interfaces/userToPlatform";

const Handles = () => {
    const defaultState = { platform_id: 0, handle: "" } as UserToPlatform
    const [userToPlatformList, setUserToPlatformList] = useState<UserToPlatform[]>([]);
    const [platforms, setPlatforms] = useState<ContestPlatform[]>([]);

    const { t } = useTranslation();

    const resetForm = async () => {
        setUserToPlatformList([defaultState]);
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

    const fetchPlatforms = async () => {
        API.getContestPlatforms()
            .then((res) => {
                const response = res;

                setPlatforms(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const postUserToPlatform = async () => {
        API.postUserToPlatformList(userToPlatformList)
            .then(() => {
                resetForm();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => { fetchPlatforms() }, [])

    return (
        <section className={classes.handles}>
            <Container>
                <div className={classes.handles}>
                    <div className={classes.handles__main_container}>
                        <p className={classes.handles__title}>{t("profile-experience-handles:handles")}</p>
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
                                            className={classes.handles__select}>
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
                                            onClick={postUserToPlatform}
                                            className={classes.buttons__save}>
                                            {t("common:save")}
                                        </button>
                                        <button
                                            onClick={resetForm}
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