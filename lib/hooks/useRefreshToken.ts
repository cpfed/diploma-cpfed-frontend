"use client";

import { stat } from "fs";
import axios from "lib/axios";
import { signIn, useSession } from "next-auth/react";

export const useRefreshToken = () => {
  const { data: session } = useSession();
  
  const refreshToken = async () => {
    await axios.post("/api/authentication/v1/token/refresh/", {
      refresh: session?.user.tokens.refresh,
    }).then((res) => {
      if (session) {
        session.user.tokens.access = res.data.access;
        session.user.tokens.refresh = res.data.refresh;
      }
      else signIn();
    }).catch((error) => {
      console.log(error);
      signIn();
    })
  };
  return refreshToken;
};