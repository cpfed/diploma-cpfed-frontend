import { LinkElement } from "@/interfaces/linkElement";

export const menuLinks: LinkElement[] = [
	{
		title: "profile-menu-list:personal-info",
		link: "/profile"
	},
	// TODO: add after release
	// {
	// 	title: "profile-menu-list:contest-info",
	// 	link: "/profile/contest-info"
	// },
    // {
    //     title: "profile-menu-list:olympiads",
	// 	link: "/profile/olympiads"
    // },
    {
        title: "profile-menu-list:handles",
		link: "/profile/handles"
    }
]


export { default } from './Profile'