import React, { useEffect, useState } from "react";

import Container from "@/components/ui/Container";
import classes from "./ContestInfo.module.scss";
import useTranslation from "next-translate/useTranslation"
import { API } from "@/api/cpdefAPI";

const ContestInfo = () => {

    const { t } = useTranslation();

    const [currentContestID, setCurrentContestID] = useState<number>(0);
    const [currentContest, setCurrentContest] = useState<string>("test");
    const [currentChampionship, setCurrentChampionship] = useState<string>("test2");
    const [contestLogin, setContestLogin] = useState<string>("");
    const [contestPassword, setContestPassword] = useState<string>("");
    const [isContestInfoAvailable, setIsContestInfoAvailable] = useState<boolean>(false);

    const activeContest = () => {
        API.activeContest()
            .then((res) => {
                setCurrentChampionship(res.championship_name);
                setCurrentContestID(res.contest_id);
                setCurrentContest(res.contest_name);
                setIsContestInfoAvailable(true);
                fetchContestCredentials(res.contest_id);
            })
            .catch((err) => {

            });
    }

    const fetchContestCredentials = (contestID: number) => {
        API.fetchContestCredentials(contestID)
            .then((res) => {
                setContestLogin(res.login);
                setContestPassword(res.password);
            })
            .catch((err) => { });
    }

    useEffect(() => { activeContest() }, [])

    return (
        <section className={classes.contestInfo} id="intro">
            <Container>
                <div className={classes.contestInfo__main_container}>
                    {isContestInfoAvailable ?
                        <>

                            <div className={classes.contestInfo__container}>
                                <div className={classes.contestInfo__subcontainer}>
                                    <label className={classes.contestInfo__label}>
                                        {t("contest-info:active-championship")}
                                    </label>
                                    <p className={classes.contestInfo__p}>
                                        {currentChampionship}
                                    </p>
                                </div>
                                <div className={classes.contestInfo__subcontainer}>
                                    <label className={classes.contestInfo__label}>
                                        {t("contest-info:active-contest")}
                                    </label>
                                    <p className={classes.contestInfo__p}>
                                        {currentContest}
                                    </p>
                                </div>
                                <div className={classes.contestInfo__subcontainer}>
                                    <label className={classes.contestInfo__label}>
                                        {t("contest-info:contest-login")}
                                    </label>
                                    <input
                                        className={classes.contestInfo__input}
                                        type="text"
                                        value={contestLogin}
                                        disabled
                                    />
                                </div>
                                <div className={classes.contestInfo__subcontainer}>
                                    <label className={classes.contestInfo__label}>
                                        {t("contest-info:contest-password")}
                                    </label>
                                    <input
                                        className={classes.contestInfo__input}
                                        type="text"
                                        value={contestPassword}
                                        disabled
                                    />
                                </div>
                            </div>
                        </> :
                        <></>
                    }
                </div>
            </Container>
        </section>
    );
};

export default ContestInfo;