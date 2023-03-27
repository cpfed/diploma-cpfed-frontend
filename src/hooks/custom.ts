import { getTokens } from "@/utils/tokens"
import { API } from "@/api/cpdefAPI";
import { CpfedAccount } from "@/interfaces/account";

export const useAccount = () => {
    let account: CpfedAccount | undefined = undefined;
    
    /**
     * Check user to logged in
     * @returns `true` if user is logged in otherwise `false`
     */
    const isLoggedIn = () => {
        return account !== undefined;
    }
    
    /**
     * Get user's account
     * @returns `CpfedAccount` if user is logged in otherwise `undefined`
     */
    const get = () => {
        return account;
    }

    /**
     * Update user in backend
     */
    const put = async (account: CpfedAccount) => {
        await API.updateProfileMe(account);
    }
    
    /**
     * Update information about user from backend
     */
    const reload = async () => {
        try {
            account = await API.profileMe();
        } catch {}
    }

    const init = async () => {
        await reload();
    }


    return {
        isLoggedIn,
        get,
        put,
        reload,
        init
    }
}
