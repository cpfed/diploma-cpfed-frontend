"use client";
import classes from './Profile.module.scss'

import { ReactNode } from 'react'

import { menuLinks } from '.'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link';


interface LayoutProps {
	children: ReactNode
	title: string
	description: string
}

const Profile = ({
	children,
}: LayoutProps) => {
    const { t } = useTranslation();

	return (
		<>
            <div className={classes.layout}>
                <ul className={classes.submenus}>
                    {menuLinks.map((element, index, self) => {
                        return (
                            <li key={index} className={classes.submenus__item}>
                                <Link href={element.link}>{t(element.title)}</Link>
                            </li>
                        );
                    })}
                </ul>
                {children}
            </div>
		</>
	)
}

export default Profile;