import { LinkElement } from "@/interfaces/linkElement";
import icons from "@/utils/icons";

export const elements: LinkElement[] = [
    {
        title: "Главная",
        link: "/",
    },
    {
        title: "Правила Чемпионата",
        link: "/championship",
    },
    {
        title: "Полезные документы",
        link: "/documents",
    },
];

interface AuthElement {
    title: string;
    iconSrc: string;
    href: string;
};

const loggedIn: AuthElement[] = [
    {
        title: "Мой аккаунт",
        iconSrc: icons.headerProfile.src,
        href: "/profile",
    },
    {
        title: "Выйти",
        iconSrc: icons.headerExit.src,
        href: "/signOut",
    },
];

const loggedOut: AuthElement[] = [
    {
        title: "Войти",
        iconSrc: icons.headerEnter.src,
        href: "/login",
    },
    {
        title: "Зарегистрироваться",
        iconSrc: icons.headerAdd.src,
        href: "/signUp",
    },
];

export const authElements = {
    loggedIn,
    loggedOut,
};

export { default } from "./Header";
