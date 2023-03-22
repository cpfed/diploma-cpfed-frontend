import React, { useEffect, useState } from "react";

import Container from "@/components/ui/Container";
import { useSession } from "next-auth/react";
import classes from "./Experience.module.scss";
import useAxiosAuth from "lib/hooks/useAxiosAuth";

import { Platform } from ".";
import useTranslation from "next-translate/useTranslation";

const Experience = () => {
    const [selectedPlatform, setSelectedPlatform] = useState<number>(0);
    const [handle, setHandle] = useState<string>("");
    const [platforms, setPlatforms] = useState<Platform[]>([]);

    const { data: session, status } = useSession({required: true});

    const axiosAuth = useAxiosAuth();

    const { t } = useTranslation();

    const fetchPlatforms = async() => {
        if (status !== "loading") {
            const res = await axiosAuth.get("api/platforms/v1/contest-platforms/");
    
            const response = res.data as Platform[];
            console.log(response);

            setPlatforms(response);
            if (response.length != 0) {
                setSelectedPlatform(response[0].id);
            }
        }
    }

    const postUserToPlatform = async() => {
        if (status !== "loading") {
            const res = await axiosAuth.post("api/user-info/v1/handles/", {
                platform_id: selectedPlatform,
                handle: handle,
            });
            
            if (res.status !== 201) {
                console.log("error");
            }
        }
    }

    useEffect(() => {fetchPlatforms()}, [status])

    return (
        <section className={classes.experience}>
            <Container>
                <div className={classes.experience}>
                    <p>{selectedPlatform}</p>
                    <div>
                        <label
                            htmlFor="name"
                            className={classes.experience__label}
                        >
                            {t("profile-experience:platform-name")}
                        </label>
                        <select 
                            onChange={(e)=>setSelectedPlatform(parseInt(e.target.value))}
                            className={classes.experience__select}>
                            {
                                platforms.map((platform, index, self) => {
                                    return (
                                        <option 
                                            key={index} 
                                            value={platform.id}
                                            className={classes.experience__select_text}
                                        >
                                            {platform.name}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor="name"
                            className={classes.experience__label}
                        >
                            {t("profile-experience:handle")}
                        </label>
                        <input
                            id="handle"
                            name="handle"
                            type="text"
                            onChange={(event) =>
                                setHandle(event.currentTarget.value)
                            }
                            placeholder={t("profile-experience:handle")}
                            className={classes.experience__input}
                            required
                        />
                    </div>
                    <button onClick={postUserToPlatform}>
                        {t("common:save")}
                    </button>
                </div>
            </Container>
        </section>
    );
};

export default Experience;