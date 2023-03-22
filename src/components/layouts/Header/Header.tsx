import React from "react";
import Link from "next/link";

import Container from "@/components/ui/Container";
import classes from "./Header.module.scss";
import { elements } from ".";
import { useRouter } from "next/router"


const Header = () => {
    const router = useRouter();

    return (
        <header className={classes.header}>
            <Container>
                <nav className={[classes.header__navigation].join(" ")}>
                    <ul
                        className={[
                            classes.list,
                            classes.list_desktop,
                        ].join(" ")}
                    >
                        {elements.map((element, index, self) => {
                            return (
                                <li
                                    key={index}
                                    role="link"
                                    className={[
                                        classes.list__item,
                                    ].join(" ")}
                                >
                                    <Link href={element.link!}>
                                        {element.title}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    <div className={[
                        classes.locale_and_account,
                        classes.locale_and_account__desktop,
                    ].join(" ")}>
                        <ul className={classes.locale_and_account__item}>
                            {router.locales?.map((locale, index) => (
                                <li key={index}>
                                    <Link href={router.asPath} locale={locale}>
                                        {locale.toUpperCase()}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <Link className={[
                            classes.locale_and_account__desktop,
                            classes.locale_and_account__item,
                        ].join(" ")} href="#">
                            Мой аккаунт
                        </Link>
                    </div>
                </nav>
            </Container>
        </header>
    );
};

export default Header;