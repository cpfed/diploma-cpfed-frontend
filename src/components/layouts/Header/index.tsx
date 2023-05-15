import { LinkElement } from "@/interfaces/linkElement";
import icons from "@/utils/icons";

export const elements: LinkElement[] = [
    {
        title: "header:main",
        link: "/",
    },
    {
        title: "header:championship",
        link: "/championship",
    },
    {
        title: "header:documents",
        link: "/documents",
    },
    {
        title: "header:championship-results",
        link: "/championship-results",
    },
];

interface AuthElement {
    title: string;
    iconSrc: string;
    href: string;
};

const loggedIn: AuthElement[] = [
    {
        title: "header:my-account",
        iconSrc: icons.headerProfile.src,
        href: "/profile",
    },
    {
        title: "header:sign-out",
        iconSrc: icons.headerExit.src,
        href: "/signOut",
    },
];

const loggedOut: AuthElement[] = [
    {
        title: "header:login",
        iconSrc: icons.headerEnter.src,
        href: "/login",
    },
];

const loggedOutAndRegistrationPossible: AuthElement[] = [
    {
        title: "header:login",
        iconSrc: icons.headerEnter.src,
        href: "/login",
    },
    {
        title: "header:sign-up",
        iconSrc: icons.headerAdd.src,
        href: "/signUp",
    },
];

export const authElements = {
    loggedIn,
    loggedOut,
    loggedOutAndRegistrationPossible,
};

export { default } from "./Header";
