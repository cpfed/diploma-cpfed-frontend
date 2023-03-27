import React, { useEffect, useState } from "react";
import Link from "next/link";

import Container from "@/components/ui/Container";
import WarningModal from "@/components/ui/WarningModal";

import classes from "./Intro.module.scss";
import useTranslation from "next-translate/useTranslation";
import icons from "@/utils/icons";
import { API } from "@/api/cpdefAPI";
import { CpfedAccount } from "@/interfaces/account";

const Intro = () => {
    const { t } = useTranslation();
    const [account, setAccount] = useState<CpfedAccount | undefined>(undefined);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(()=>{
        API.profileMe()
        .then(setAccount);
    }, []);

    const onRegister = () => {
        setIsOpen(!isOpen);
    }

    return (
        <section className={classes.intro} id="intro">
            <Container>
                <div className={classes.intro}>
                    <img src={icons.developer.src}/>
                    <div className={classes.intro__content}>
                        <div className={classes.intro__partner}>
                            <img src={icons.freedomLogo.src} />
                            <p>-генеральный партнер</p>
                        </div>
                        <p className={classes.intro__description}>
                            {t('intro:title')}
                        </p>
                        <button onClick={onRegister} className={classes.intro__button}>
                            {t('intro:button')}
                        </button>
                    </div>
                </div>

                <WarningModal 
                    confirmButtons={[
                        {
                            title: "OKAY",
                            callback: ()=>{}
                        },
                        {
                            title: "okay",
                            callback: ()=>{}
                        }
                    ]} 
                    declineButtons={[
                        {
                            title: "NOOO",
                            callback: ()=>{}
                        },
                        {
                            title: "no",
                            callback: ()=>{}
                        }   
                    ]} 
                    message="TEST MESSAGE" 
                    isOpen={isOpen} />
            </Container>
        </section>
    );
};

export default Intro;
