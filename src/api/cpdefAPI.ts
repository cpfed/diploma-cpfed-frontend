import {
    CpfedAccount,
    CpfedAccountUpdate,
    CpfedAccountWithPassword,
} from "@/interfaces/account";
import { CpfedCredentials } from "@/interfaces/credentials";
import { ContestPlatform } from "@/interfaces/contestPlatforms";
import { Tokens } from "@/interfaces/tokens";
import {
    NewUserToPlatform,
    UserToPlatformList,
    UpdatedUserToPlatform,
} from "@/interfaces/userToPlatform";
import { setTokens, getTokens, clearTokens } from "@/utils/tokens";
import axios from "axios";
import Cookies from "js-cookie";
import {
    NewUserOlympiad,
    UpdatedUserOlympiad,
    UserOlympiadList,
} from "@/interfaces/userOlympiad";
import {
    Championship,
    ChampionshipCheckRegistration,
} from "@/interfaces/championship";
import { RegionList } from "@/interfaces/region";
import { ContestCredentials } from "@/interfaces/contestCredentials";
import { Contest } from "@/interfaces/contest";

const publicInstance = axios.create({
    baseURL: process.env.CPFED_API_URL,
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
        // 'Access-Control-Allow-Origin': '*',
    },
});

const privateInstance = axios.create({
    baseURL: process.env.CPFED_API_URL,
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
        // 'Access-Control-Allow-Origin': '*',
    },
});

privateInstance.interceptors.request.use((req) => {
    const token = Cookies.get("access_token");

    if (token) {
        req.headers["Authorization"] = `Bearer ${token}`;
        return req;
    } else {
        throw {
            code: 403,
            message: "Unauthorized request",
        };
    }
});

privateInstance.interceptors.response.use(
    async (res) => res,
    async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
            prevRequest.sent = true;
            try {
                await API.refresh();
            } catch (error) {
                clearTokens();
                window.location.href = "/login";
            }
            prevRequest.headers["Authorization"] = `Bearer ${
                getTokens().refresh
            }`;
            return privateInstance(prevRequest);
        } else {
            return Promise.reject(error);
        }
    }
);

export const API = {
    refresh: async () => {
        try {
            const res = await publicInstance.post<Tokens>(
                "/authentication/v1/token/refresh/",
                {
                    refresh: getTokens().refresh,
                }
            );

            setTokens(res.data);
        } catch (error) {
            throw error;
        }
    },

    login: async (
        email?: string,
        password?: string
    ): Promise<CpfedCredentials> => {
        try {
            const res = await publicInstance.post<CpfedCredentials>(
                "/authentication/v1/login/",
                {
                    email,
                    password,
                }
            );
            setTokens(res.data.tokens);
            return res.data;
        } catch (error: any) {
            throw error;
        }
    },

    logout: async () => {
        try {
			const res = await privateInstance.post(
				`/authentication/v1/logout/`,
                {
					refresh: getTokens().refresh,
                }
			);
			clearTokens();
            return res.data;
        } catch (error) {
            throw error;
        }
    },

    signUp: async (account: CpfedAccountWithPassword): Promise<void> => {
        try {
            await publicInstance.post("/authentication/v1/sign-up/", {...account, place_of_study_of_work: account.place_of_study_of_work == "" ? null : account.place_of_study_of_work });
        } catch (error) {
            throw error;
        }
    },

    profileMe: async (): Promise<CpfedAccount> => {
        try {
            const res = await privateInstance.get<CpfedAccount>(
                "/authentication/v1/profile/me/"
            );
            return res.data;
        } catch (error) {
            throw error;
        }
    },

    updateProfileMe: async (
        account: CpfedAccountUpdate
    ): Promise<CpfedAccountUpdate> => {
        try {
            const res = await privateInstance.put<CpfedAccountUpdate>(
                "/authentication/v1/profile/me/",
                account
            );
            return res.data;
        } catch (error) {
            throw error;
        }
    },

    getContestPlatforms: async () => {
        try {
            const res = await privateInstance.get<ContestPlatform[]>(
                "/platforms/v1/contest-platforms/"
            );
            return res.data;
        } catch (error) {
            throw error;
        }
    },

    addUserToPlatformList: async (userToPlatformList: NewUserToPlatform[]) => {
        try {
            await privateInstance.post(
                "/user-info/v1/handles/",
                userToPlatformList
            );
        } catch (error) {
            throw error;
        }
    },

    fetchUserToPlatformList: async () => {
        try {
            const res = await privateInstance.get<UserToPlatformList>(
                "/user-info/v1/handles/"
            );
            return res.data;
        } catch (error) {
            throw error;
        }
    },

    updateUserToPlatform: async (userToPlatform: UpdatedUserToPlatform) => {
        try {
            await privateInstance.put(
                `/user-info/v1/handles/${userToPlatform.id}/`,
                userToPlatform
            );
        } catch (error) {
            throw error;
        }
    },

    deleterUserToPlatform: async (id: number) => {
        try {
            await privateInstance.delete(`/user-info/v1/handles/${id}/`);
        } catch (error) {
            throw error;
        }
    },

    addUserOlympiadList: async (userOlympiadList: NewUserOlympiad[]) => {
        try {
            await privateInstance.post(
                `/user-info/v1/olympiads/`,
                userOlympiadList
            );
        } catch (error) {
            throw error;
        }
    },

    fetchUserOlympiadList: async () => {
        try {
            const res = await privateInstance.get<UserOlympiadList>(
                `/user-info/v1/olympiads/`
            );
            return res.data;
        } catch (error) {
            throw error;
        }
    },

    updateUserOlympiad: async (userOlympiad: UpdatedUserOlympiad) => {
        try {
            await privateInstance.put(
                `/user-info/v1/olympiads/${userOlympiad.id}/`,
                userOlympiad
            );
        } catch (error) {
            throw error;
        }
    },

    deleterUserOlympiad: async (id: number) => {
        try {
            await privateInstance.delete(`/user-info/v1/olympiads/${id}/`);
        } catch (error) {
            throw error;
        }
    },

    activeChampionship: async (): Promise<Championship> => {
        try {
            const res = await publicInstance.get<Championship>(
                "/platforms/v1/get-active-championship"
            );
            return res.data;
        } catch (error) {
            throw error;
        }
    },

    activeContest: async (): Promise<Contest> => {
        try {
            const res = await publicInstance.get<Contest>(
                "/platforms/v1/get-active-contest"
            );
            return res.data;
        } catch (error) {
            throw error;
        }
    },

    checkChampionshipRegistration:
        async (): Promise<ChampionshipCheckRegistration> => {
            try {
                const res =
                    await privateInstance.get<ChampionshipCheckRegistration>(
                        "/platforms/v1/check_registration/"
                    );
                return res.data;
            } catch (error) {
                throw error;
            }
        },

    registerChampionship: async () => {
        try {
            await privateInstance.post(
                "/authentication/v1/championship-register/"
            );
        } catch (error) {
            throw error;
        }
    },

    forgotPassword: async (email: string) => {
        try {
            const res = await publicInstance.post(
                "/authentication/v1/password/recovery/",
                {
                    email,
                }
            );
            return res.data;
        } catch (error) {
            throw error;
        }
    },

    //ba64406d-290c-4130-8702-e8bb9eaa730e
    checkRecoveryPasswordId: async (id: string) => {
        try {
            const res = await publicInstance.get(
                `/authentication/v1/password/recovery/${id}/confirm/`
            );
            return res.data;
        } catch (error) {
            throw error;
        }
    },

    recoverPassword: async (
        id: string,
        new_password: string,
        new_password_confirm: string
    ) => {
        try {
            const res = await publicInstance.post(
                `/authentication/v1/password/recovery/${id}/confirm/`,
                {
                    new_password,
                    new_password_confirm,
                }
            );
            return res.data;
        } catch (error) {
            throw error;
        }
    },

    fetchRegions: async () => {
        try {
            const res = await publicInstance.get<RegionList>(
                `/locations/v1/regions/`
            );
            return res.data;
        } catch (error) {
            throw error;
        }
    },

    fetchContestCredentials: async (id: number) => {
        try {
            const res = await privateInstance.get<ContestCredentials>(
                `/platforms/v1/get-contest-credentials/${id}/`
            );
            return res.data;
        } catch (error) {
            throw error;
        }
    },
};
