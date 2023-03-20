import NextAuth from "next-auth/next";


declare module "next-auth" {
    interface Session {
        user: {
            email: string,
            sub: string,
            id: number,
            uin: string,
            phone_number: string,
            tokens: {
                refresh: string,
                access: string,
            },
        }
    }
}