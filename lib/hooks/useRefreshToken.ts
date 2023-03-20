"use client";

import { stat } from "fs";
import axios from "lib/axios";
import { signIn, useSession } from "next-auth/react";

export const useRefreshToken = () => {
  const { data: session, status } = useSession({
    required: true,
  });
  
  const refreshToken = async () => {
    console.log("REFRESHHH", session?.user.tokens.refresh)
    const res = await axios.post("/api/authentication/v1/token/refresh/", {
      refresh: session?.user.tokens.refresh,
    }).then((res) => {
      if (session) {
        console.log(session.user.tokens.refresh)
        console.log(res.data.refresh)
        session.user.tokens.access = res.data.access;
        session.user.tokens.refresh = res.data.refresh;
      }
      else signIn();
    }).catch((error) => {
      console.log(error);
    })
  };
  return refreshToken;
};