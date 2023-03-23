import { CpfedAccount } from '@/interfaces/account';
import { Tokens } from '@/interfaces/tokens';
import { setTokens, getTokens } from '@/utils';
import axios from 'axios';
import Cookies from 'js-cookie';

const publicInstance = axios.create({
    baseURL: process.env.CPFED_API_URL,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
		// 'Access-Control-Allow-Origin': '*',
    }
})

const privateInstance = axios.create({
    baseURL: process.env.CPFED_API_URL,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
		// 'Access-Control-Allow-Origin': '*',
    }
})

privateInstance.interceptors.request.use((req) => {
	const token = Cookies.get("access_token");

	if (token) {
		req.headers['Authorization'] = `Bearer ${token}`;
		return req;
	} else {
		throw {
			code: 403,
			message: 'Unauthorized request',
		};
	}
});

privateInstance.interceptors.response.use(async (res) => res, async (error) => {
    const prevRequest = error?.config;
	if (error?.response?.status === 401 && !prevRequest?.sent) {
		prevRequest.sent = true;
		try {
			await API.refresh();
		} catch (error)
		{
			window.location.href = "/login";
		}
		prevRequest.headers["Authorization"] = `Bearer ${getTokens().refresh}`;
		return privateInstance(prevRequest);
	} else {
		return Promise.reject(error);
	}
});


export const API = {
	refresh: async () => {
		try {
			const res = await publicInstance.post<Tokens>("/authentication/v1/token/refresh/", {
				refresh: getTokens().refresh
			});

			setTokens(res.data);
		} catch(error){
			throw error;
		}
	},

	login: async (email?: string, password?: string): Promise<CpfedAccount> => {
		try {
			const res = await publicInstance.post<CpfedAccount>("/authentication/v1/login/", {
				email,
				password
			});

			setTokens(res.data.tokens);
			return res.data;
		} catch (error: any) {
			throw error;
		}
	},

	signUp: async (email: string, password: string): Promise<void> => {
		try {
			await publicInstance.post("/authentication/v1/sign-up/", {
				email,
				password
			});
		} catch (error: any) {
			throw error;
		}
	},

	profileMe: async () => {
		try {
			const res = await privateInstance.get<CpfedAccount>("/authentication/v1/profile/me/");
			return res.data;
		} catch (error) {
			throw error;
		}
	}
}



