import React, { HtmlHTMLAttributes, useEffect, useRef, useState } from "react";
import Link from "next/link";

import Container from "@/components/ui/Container";
import classes from "./Header.module.scss";
import { elements, authElements } from ".";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation"
import { setIsLoggedIn } from "@/store/account/slice";
import { useDispatch } from "react-redux";
import { getTokens } from "@/utils/tokens";
import { useTypedSelector } from "@/hooks/reduxHooks";
import icons from "@/utils/icons";

const Header = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { t } = useTranslation();

    const headerRef = useRef<HTMLElement>(null);
    const burgerRef = useRef<HTMLDivElement>(null);
    const mobileContentRef = useRef<HTMLDivElement>(null);

    const { isLoggedIn } = useTypedSelector((state) => (state.account))

    const offBurger = () => {
        headerRef.current?.classList.remove(classes.header__active);
        burgerRef.current?.classList.remove(classes.header__active);
        mobileContentRef.current?.classList.add(classes.disabled);
        document.body.classList.remove("lock");
    }

    const onBurger = () => {
        headerRef.current?.classList.toggle(classes.header__active);
        burgerRef.current?.classList.toggle(classes.burger__active);
        mobileContentRef.current?.classList.toggle(classes.disabled);
        document.body.classList.toggle("lock");
    };


    useEffect(() => {
        dispatch(setIsLoggedIn(getTokens().access !== undefined));

        window.addEventListener("resize", (event) => {
            if (
                document.body.clientWidth > 1024 &&
                burgerRef.current?.classList.contains(classes.burger__active)
            ) {
                onBurger();
            }
        });
    }, []);

    useEffect(() => {
        offBurger();
    }, [router.asPath])


    return (
        <header className={classes.header} ref={headerRef}>
            <Container>
                <nav
                    className={[
                        classes.header__navigation,
                        classes.header__navigation_desktop,
                    ].join(" ")}
                >
                    <ul className={classes.list}>
                        {elements.map((element, index, self) => {
                            return (
                                <li
                                    key={index}
                                    role="link"
                                    className={[classes.list__item].join(" ")}
                                >
                                    <Link href={element.link!}>
                                        {t(element.title)}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    <div className={classes.locale_and_account}>
                        <ul className={classes.locale_and_account__item}>
                            {router.locales?.map((locale, index) => (
                                <li key={index}>
                                    <Link href={router.asPath} locale={locale}>
                                        {locale.toUpperCase()}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <ul className={classes.locale_and_account__item}>
                            {(isLoggedIn
                                ? authElements.loggedIn
                                : authElements.loggedOut
                            ).map((value, index) => {
                                return (
                                    <li key={index}>
                                        <Link href={value.href}>
                                            {t(value.title)}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </nav>
                <nav
                    className={[
                        classes.header__navigation,
                        classes.header__navigation_mobile,
                    ].join(" ")}
                >
                    <div className={classes.header__top}>
                        <div>
                            <div
                                ref={burgerRef}
                                className={classes.burger}
                                onClick={onBurger}
                            ></div>
                        </div>

                        <div className={classes.header__top_icon_box}>
                            {isLoggedIn ? (
                                <Link href={"/profile"}>
                                    <img
                                        src={icons.myAccount.src}
                                    ></img>
                                </Link>
                            ) : (
                                <Link href={"/login"}>
                                    <img
                                        src={icons.singIn.src}
                                    ></img>
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className={classes.disabled} ref={mobileContentRef}>
                        <ul
                            className={[classes.list, classes.list_mobile].join(
                                " "
                            )}
                        >
                            {elements.map((element, index, self) => {
                                return (
                                    <li
                                        key={index}
                                        role="link"
                                        className={[
                                            classes.list_mobile__item,
                                        ].join(" ")}
                                    >
                                        <Link href={element.link!}>
                                            {t(element.title)}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>

                        <div className={classes.locale_and_account_mobile}>
                            <ul
                                className={[
                                    classes.locale_and_account_mobile__item,
                                ].join(" ")}
                            >
                                {router.locales?.map((locale, index) => (
                                    <li key={index}>
                                        <Link
                                            href={router.asPath}
                                            locale={locale}
                                        >
                                            {locale.toUpperCase()}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            {(isLoggedIn
                                ? authElements.loggedIn
                                : authElements.loggedOut
                            ).map((element, index) => {
                                return (
                                    <li
                                        key={index}
                                        className={
                                            classes.locale_and_account_mobile__item
                                        }
                                    >
                                        <img src={element.iconSrc} />
                                        <Link href={element.href}>
                                            {t(element.title)}
                                        </Link>
                                    </li>
                                );
                            })}
                        </div>
                    </div>
                </nav>
            </Container>
        </header>
    );
};

export default Header;
