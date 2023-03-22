import axios from "lib/axios";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Exception } from "sass";
export const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: "credentials",

            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials) {
                const res = await axios.post("api/authentication/v1/login/", {
                    email: credentials?.email,
                    password: credentials?.password,
                });
                console.log("RES=" + res);
                const user = res.data;
                return user;
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user, account }) {
            console.log({ account });

            return { ...token, ...user };
        },
        async session({ session, token, user }) {
            console.log({ token });
            session.user = token as any;

            return session;
        },
    },
};
export default NextAuth(authOptions);
