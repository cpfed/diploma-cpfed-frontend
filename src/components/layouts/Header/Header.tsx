import React, { HtmlHTMLAttributes, useEffect, useRef, useState } from "react";
import Link from "next/link";

import Container from "@/components/ui/Container";
import { getTokens } from '@/utils/tokens';
import classes from "./Header.module.scss";
import { elements, dropdownElements } from ".";
import { useRouter } from "next/router";

const Header = () => {
    const router = useRouter();

    const headerRef = useRef<HTMLElement>(null);
    const burgerRef = useRef<HTMLDivElement>(null);
    const mobileContentRef = useRef<HTMLDivElement>(null);

    
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>();

    
    const onBurger = () => {
        headerRef.current?.classList.toggle(classes.header__active);
        burgerRef.current?.classList.toggle(classes.burger__active);
        mobileContentRef.current?.classList.toggle(classes.disabled);
        document.body.classList.toggle("lock");
    };
    
    useEffect(() => {
        setIsLoggedIn(getTokens().access !== undefined);

        window.addEventListener("resize", (event) => {
            if (
                document.body.clientWidth > 1024 &&
                burgerRef.current?.classList.contains(classes.burger__active)
            ) {
                onBurger();
            }
        });
    });

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
                                        {element.title}
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
                        <div
                            className={[
                                classes.locale_and_account__item,
                                classes.dropdown,
                            ].join(" ")}
                        >
                            <Link href="#">Мой аккаунт</Link>
                            <ul>
                                {
                                    (
                                        isLoggedIn 
                                        ? dropdownElements.loggedIn
                                        : dropdownElements.loggedOut
                                    ).map((element, index) => {
                                        return <li key={index}>
                                            <img src={element.iconSrc}/>
                                            <Link href={element.href}>{element.title}</Link>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
                <nav
                    className={[
                        classes.header__navigation,
                        classes.header__navigation_mobile,
                    ].join(" ")}
                >
                    <div
                        ref={burgerRef}
                        className={classes.burger}
                        onClick={onBurger}
                    ></div>

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
                                            {element.title}
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
                            {
                                (
                                    isLoggedIn 
                                    ? dropdownElements.loggedIn
                                    : dropdownElements.loggedOut
                                ).map((element, index) => {
                                    return <li key={index} className={classes.locale_and_account_mobile__item}>
                                        <img src={element.iconSrc}/>
                                        <Link href={element.href}>{element.title}</Link>
                                    </li>
                                })
                            }
                        </div>
                    </div>
                </nav>
            </Container>
        </header>
    );
};

export default Header;
