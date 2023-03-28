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

const Intro = () => {
    const { t } = useTranslation();
    const [account, setAccount] = useState<CpfedAccount | undefined>(undefined);
    const [championship, setChampionship] = useState<Championship | undefined>(undefined);

    const [modalState, setModalState] = useState<WarningModalProps>({
        isOpen: false,
        confirmButtons: [],
        declineButtons: [],
        message: "",
    });

    useEffect(() => {
        API.profileMe().then(setAccount);
        API.activeChampionship().then(setChampionship);
    }, []);

    const onRegister = () => {
        if (!account) {
            setModalState({
                isOpen: true,
                message: "Внимание, вы не вошли в аккаунт",
                confirmButtons: [
                    {
                        title: "Ок",
                        callback: () => {
                            setModalState({ ...modalState, isOpen: false });
                        },
                    },
                ],
                declineButtons: [],
            });
            return;
        }

        if (
            Object.values(account!).some(
                (value) => value === undefined || value === null
            )
        ) {
            setModalState({
                isOpen: true,
                message:
                    "Внимание, для регистрации необходимо заполнить все данные в профиле",
                confirmButtons: [
                    {
                        title: "Ок",
                        callback: () => {
                            setModalState({ ...modalState, isOpen: false });
                        },
                    },
                ],
                declineButtons: [],
            });
            return;
        }

        setModalState({
            isOpen: true,
            message: "Регистрация на чемпионат",
            confirmButtons: [
                {
                    title: "Ок",
                    callback: () => {
                        API.registerChampionship()
                        .then(res=>{
                            toast.success("Вы успешно зарегестрированы");
                        })
                        .catch(err=>{
                            toast.error("Произошла ошибка. Свяжитесь с тех подержкой")
                        })
                        .finally(()=>{
                            setModalState({ ...modalState, isOpen: false });
                        })
                    },
                },
            ],
            declineButtons: [
                {
                    title: "Отмена",
                    callback: () => {
                        setModalState({ ...modalState, isOpen: false });
                    },
                },
            ],
        });
    };

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
                        <button
                            onClick={onRegister}
                            className={classes.intro__button}
                        >
                            {t("intro:button")}
                        </button>
                    </div>
                </div>

                <WarningModal
                    confirmButtons={modalState.confirmButtons}
                    declineButtons={modalState.declineButtons}
                    message={modalState.message}
                    isOpen={modalState.isOpen}
                />
            </Container>
        </section>
    );
};

export default Intro;
