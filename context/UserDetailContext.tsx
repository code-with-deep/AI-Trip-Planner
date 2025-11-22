"use client";

import { createContext } from "react";

interface UserDetailType {
  userDetail: any;
  setUserDetail: (value: any) => void;
}

export const UserDetailContext = createContext<UserDetailType>({
  userDetail: null,
  setUserDetail: () => {},
});
