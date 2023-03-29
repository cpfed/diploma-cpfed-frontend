import React, { useEffect, useState } from "react";
import Link from "next/link";

import Container from "@/components/ui/Container";
import WarningModal, { WarningModalProps } from "@/components/ui/WarningModal";

import classes from "./Intro.module.scss";
import useTranslation from "next-translate/useTranslation";
import icons from "@/utils/icons";
import { API } from "@/api/cpdefAPI";
import { CpfedAccount } from "@/interfaces/account";
import { Championship } from "@/interfaces/championship";
import toast from "@/utils/toast";
import { useRouter } from "next/router";

const Intro = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const [account, setAccount] = useState<CpfedAccount | undefined>(undefined);
    const [isRegistrationPossible, setIsRegistrationPossible] = useState<boolean>(false);
    const [isRegistered, setIsRegistered] = useState<boolean>(false);

    const [modalState, setModalState] = useState<WarningModalProps>({
        isOpen: false,
        confirmButtons: [],
        declineButtons: [],
        message: "",
    });

    useEffect(() => {
        API.profileMe().then(setAccount);
        API.activeChampionship().then(res=>{
            setIsRegistrationPossible(res.is_registration_possible);
        });
        API.checkChampionshipRegistration().then(res=>{
            setIsRegistered(res.is_registered);
        })

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
                        {
                            isRegistrationPossible && !isRegistered
                            ? <button
                                onClick={()=>router.push("/signUp")}
                                className={classes.intro__button}
                            >
                                {t("intro:button")}
                            </button>
                            : undefined
                        }
                    </div>
                </div>

                <WarningModal
                    confirmButtons={modalState.confirmButtons}
                    declineButtons={modalState.declineButtons}
                    message={modalState.message}
                    isOpen={modalState.isOpen}
                    rules={modalState.rules}
                />
            </Container>
        </section>
    );
};

export default Intro;
