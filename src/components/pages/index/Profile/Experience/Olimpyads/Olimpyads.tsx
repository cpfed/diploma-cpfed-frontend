import React, { useEffect, useState } from "react";

import Container from "@/components/ui/Container";
import classes from "./Handles.module.scss";
import { API } from "@/api/cpdefAPI";

import { ContestPlatform } from "@/interfaces/contestPlatforms";
import useTranslation from "next-translate/useTranslation";

const Handles = () => {
    const [selectedPlatform, setSelectedPlatform] = useState<number>(0);
    const [handle, setHandle] = useState<string>("");
    const [platforms, setPlatforms] = useState<ContestPlatform[]>([]);

    const { t } = useTranslation();

    const resetForm = async () => {
        setHandle("");
    }

    const fetchPlatforms = async () => {
        API.getContestPlatforms()
            .then((res) => {
                const response = res;

                setPlatforms(response);
                if (response.length != 0) {
                    setSelectedPlatform(response[0].id);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const postUserToPlatform = async () => {
        API.postUserToPlatform({
            platform_id: selectedPlatform,
            handle: handle,
        })
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
                        <div className={classes.handles__container}>
                            <div className={classes.handles__subcontainer}>
                                <label
                                    htmlFor="name"
                                    className={classes.handles__label}
                                >
                                    {t("profile-experience-handles:platform-name")}
                                </label>
                                <select
                                    onChange={(e) => setSelectedPlatform(parseInt(e.target.value))}
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
                                    value={handle}
                                    onChange={(event) =>
                                        setHandle(event.currentTarget.value)
                                    }
                                    placeholder={t("profile-experience-handles:handle")}
                                    className={classes.handles__input}
                                    required
                                />
                            </div>
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
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Handles;