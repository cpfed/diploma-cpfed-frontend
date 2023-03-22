import NextAuth from "next-auth/next";


declare module "next-auth" {
    interface Session {
        user: {
            id: number,
            email: string,
            exp: number,
            iat: number,
            sub: string,
            uin: string,
            phone_number: string,
            tokens: {
                refresh: string,
                access: string,
            },
        }
    }
}