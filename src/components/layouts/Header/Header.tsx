import React from "react";
import Link from "next/link";

import Container from "@/components/ui/Container";
import classes from "./Header.module.scss";
import { elements } from ".";

import { useRef } from 'react'

const Header = () => {
    const headerRef = useRef<HTMLElement>(null)

	const handleHeaderToggle = () => {
		(headerRef.current as HTMLElement).classList.toggle(classes.header_active)
		document.body.classList.toggle('lock')
	}

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
                            const isLast = index === self.length - 1;

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
                    <Link className={[
                            classes.list_desktop,
                            classes.list__item,
                        ].join(" ")} href="#">
                      Мой аккаунт
                    </Link>
                </nav>
            </Container>
        </header>
    );
};

export default Header;

// import classes from './Header.module.scss'

// import { useRef } from 'react'

// import { elements } from '.'

// import Link from 'next/link'
// import Container from '@/components/ui/Container'

// const Header = () => {
// 	const headerRef = useRef<HTMLElement>(null)

// 	const handleHeaderToggle = () => {
// 		(headerRef.current as HTMLElement).classList.toggle(classes.header_active)
// 		document.body.classList.toggle('lock')
// 	}

// 	return (
// 		<header className={classes.header} ref={headerRef}>
// 			<Container>
// 				<div className={classes.header__body}>
// 					<Link href="/" className={classes.header__branding}>
// 						<img
// 							src="/images/logo.svg"
// 							alt="logo"
// 							className={classes.header__logo}
// 						/>
// 						<h3 className={classes.header__title}>
// 							Evento
// 						</h3>
// 					</Link>
// 					<nav className={classes.header__navigation}>
// 						<ul
// 							className={[
// 								classes.list,
// 								classes.list_desktop,
// 								classes.header__list,
// 							].join(' ')}
// 						>
// 							{elements.map((element, index, self) => {
// 								const isLast = index === self.length - 1

// 								return (
// 									<li
// 										key={index}
// 										role="link"
// 										className={[
// 											!isLast ? 'underlined' : classes.list__item_last,
// 											classes.list__item,
// 										].join(' ')}
// 									>
// 										<Link href={element.link!}>
// 											{element.title}
// 										</Link>
// 									</li>
// 								)
// 							})}
// 						</ul>
// 						<ul
// 							className={[
// 								classes.list,
// 								classes.list_mobile,
// 								classes.header__list,
// 							].join(' ')}
// 						>
// 							{elements.map((element, index, self) => {
// 								const isLast = index === self.length - 1

// 								return (
// 									<li
// 										key={index}
// 										role="link"
// 										className={[
// 											!isLast ? 'underlined' : classes.list__item_last,
// 											classes.list__item,
// 										].join(' ')}
// 									>
// 										<Link href={element.link!}>
// 											{element.title}
// 										</Link>
// 									</li>
// 								)
// 							})}
// 						</ul>
// 					</nav>
// 					<div
// 						className={[classes.burger, classes.header__burger].join(' ')}
// 						onClick={handleHeaderToggle}
// 					/>
// 				</div>
// 			</Container>
// 		</header>
// 	)
// }

// export default Header
