import { Tokens } from 'src/interfaces/tokens';
import Cookies from "js-cookie"

const accessTokenKey = "access_token";
const refreshTokenKey = "refresh_token";

export const getTokens = ():Tokens => {
    return {
        access: Cookies.get(accessTokenKey),
        refresh: Cookies.get(refreshTokenKey)
    }
}

export const setTokens = (tokens: Tokens) => {
    if(tokens.access) Cookies.set(accessTokenKey, tokens.access);
    if(tokens.refresh) Cookies.set(refreshTokenKey, tokens.refresh);
}

export const clearTokens = () => {
    Cookies.remove(accessTokenKey);
    Cookies.remove(refreshTokenKey);
}