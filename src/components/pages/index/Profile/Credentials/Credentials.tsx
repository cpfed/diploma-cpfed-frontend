import React, { useEffect, useState } from "react";

import Container from "@/components/ui/Container";
import { useSession } from "next-auth/react";
import classes from "./Credentials.module.scss";
import useAxiosAuth from "lib/hooks/useAxiosAuth";

const Credentials = () => {
    const [firstname, setFirstname] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [team, setTeam] = useState("");

    const { data: session, status } = useSession({required: true});

    const axiosAuth = useAxiosAuth();

    const fetchInfo = async() => {
        if (status !== "loading") {
            const res = await axiosAuth.get("api/authentication/v1/profile/me/");
    
            const response = res.data;
            console.log(response);
    
            setEmail(response.email);
        }
    }

    useEffect(() => {fetchInfo()}, [status])

    return (
        <section className={classes.credentials}>
            <button onClick={fetchInfo}>
                Отправить
            </button>
            <h1>{email}</h1>
            <Container>
                <div className={classes.credentials}>
                    <div className={classes.credentials__image_and_small_info}>
                        <img src="images/Kama.png"></img>
                        <div className={classes.smallinfo}>
                            <div className={classes.smallinfo__item}>
                                <label
                                    htmlFor="name"
                                    className={classes.smallinfo__label}
                                >
                                    Имя
                                </label>
                                <input
                                    id="firstname"
                                    name="firstname"
                                    type="text"
                                    onChange={(event) =>
                                        setFirstname(event.currentTarget.value)
                                    }
                                    placeholder="Имя"
                                    className={classes.smallinfo__input}
                                />
                            </div>
                            <div className={classes.smallinfo__item}>
                                <label
                                    htmlFor="surname"
                                    className={classes.smallinfo__label}
                                >
                                    Фамилия
                                </label>
                                <input
                                    id="surname"
                                    name="surname"
                                    type="text"
                                    onChange={(event) =>
                                        setSurname(event.currentTarget.value)
                                    }
                                    placeholder="Фамилия"
                                    className={classes.smallinfo__input}
                                />
                            </div>
                            <div className={classes.smallinfo__item}>
                                <label
                                    htmlFor="name"
                                    className={classes.smallinfo__label}
                                >
                                    Электронная почта
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
                                    onChange={(event) =>
                                        setEmail(event.currentTarget.value)
                                    }
                                    placeholder={email}
                                    className={classes.smallinfo__input}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={classes.biginfo}>
                            <div className={classes.biginfo__item}>
                                <label
                                    htmlFor="bio"
                                    className={classes.biginfo__label}
                                >
                                    Bio
                                </label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    onChange={(event) =>
                                        setBio(event.currentTarget.value)
                                    }
                                    className={classes.biginfo__input}
                                />
                            </div>
                            <div className={classes.biginfo__item}>
                                <label
                                    htmlFor="team"
                                    className={classes.biginfo__label}
                                >
                                    Team
                                </label>
                                <textarea
                                    id="team"
                                    name="team"
                                    onChange={(event) =>
                                        setSurname(event.currentTarget.value)
                                    }
                                    className={classes.biginfo__input}
                                />
                            </div>
                        </div>
                </div>
            </Container>
        </section>
    );
};

export default Credentials;