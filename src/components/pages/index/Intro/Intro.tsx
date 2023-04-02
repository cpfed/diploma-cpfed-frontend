import React, { useEffect, useState } from "react";

import Container from "@/components/ui/Container";
import classes from "./Intro.module.scss";
import useTranslation from "next-translate/useTranslation";
import icons from "@/utils/icons";
import { API } from "@/api/cpdefAPI";
import { CpfedAccount } from "@/interfaces/account";
import { useRouter } from "next/router";

const Intro = () => {
    const router = useRouter();
    const { t } = useTranslation();
    // const [account, setAccount] = useState<CpfedAccount | undefined>(undefined);
    const [isRegistrationPossible, setIsRegistrationPossible] =
        useState<boolean>(false);
    const [isRegistered, setIsRegistered] = useState<boolean>(false);

    useEffect(() => {
        // API.profileMe()
        //     .then(setAccount)
        //     .catch((err) => {});
        API.activeChampionship()
            .then((res) => {
                setIsRegistrationPossible(res.is_registration_possible);
            })
            .catch((err) => {});
        API.checkChampionshipRegistration()
            .then((res) => {
                setIsRegistered(res.is_registered);
            })
            .catch((err) => {});
    }, []);

    return (
        <section className={classes.intro} id="intro">
            <Container>
                <div className={classes.intro}>
                    <img src={icons.developer.src} />
                    <div className={classes.intro__content}>
                        <div className={classes.intro__partner}>
                            <img src={icons.freedomLogo.src} />
                            <p>-генеральный партнер</p>
                        </div>
                        <p className={classes.intro__description}>
                            {t("intro:title")}
                        </p>
                        {isRegistrationPossible && !isRegistered ? (
                            <button
                                onClick={() => router.push("/signUp")}
                                className={classes.intro__button}
                            >
                                {t("intro:button")}
                            </button>
                        ) : undefined}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Intro;