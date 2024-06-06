import React, { useEffect, useState } from "react";

import Container from "@/components/ui/Container";
import classes from "./ContestInfo.module.scss";
import useTranslation from "next-translate/useTranslation"
import { API } from "@/api/cpdefAPI";
import Link from "next/link";

const ContestInfo = () => {

    const { t } = useTranslation();

    const [currentContestLink, setCurrentContestLink] = useState<string>("https://esep.cpfed.kz/qual");
    const [currentContestID, setCurrentContestID] = useState<number>(0);
    const [currentContest, setCurrentContest] = useState<string>("test");
    const [currentChampionship, setCurrentChampionship] = useState<string>("test2");
    const [contestLogin, setContestLogin] = useState<string>("");
    const [contestPassword, setContestPassword] = useState<string>("");
    const [isContestInfoAvailable, setIsContestInfoAvailable] = useState<boolean>(false);
    const [diploma, setDiploma] = useState<string>("");

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

    const fetchInfo = () => {
        API.profileMe()
            .then((res) => {
                setDiploma(res.diploma);
            })
    }

    useEffect(() => { activeContest(); fetchInfo(); }, [])

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
                                        {t("contest-info:link")}
                                    </label>
                                    <Link href={currentContestLink} target={"_blank"} className={classes.contestInfo__p}>
                                        {currentContestLink}
                                    </Link>
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
                    { diploma &&
                        <>
                            <div className={classes.contestInfo__container}>
                                <div className={classes.contestInfo__subcontainer}>
                                    <label className={classes.contestInfo__label}>
                                        {t("contest-info:diploma")}
                                    </label>
                                    <p className={classes.contestInfo__p}>
                                        <Link
                                            href={diploma}
                                            target="_blank">
                                            {t("contest-info:download")}
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </Container>
        </section>
    );
};

export default ContestInfo;
