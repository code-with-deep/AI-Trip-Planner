"use client";

import React, { useEffect, useState, useContext } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { UserDetailContext } from "@/context/UserDetailContext";

interface ProviderProps {
  children: React.ReactNode;
}

const Provider = ({ children }: ProviderProps) => {
  const createUser = useMutation(api.user.CreateNewUser);
  const [userDetail, setUserDetail] = useState<any>();
  const { user } = useUser();

  useEffect(() => {
    if (!user?.id) return;

    const saveUser = async () => {
      try {
        const result = await createUser({
          email: user.primaryEmailAddress?.emailAddress ?? "",
          imageUrl: user.imageUrl ?? "",
          name: user.fullName ?? "",
        });
        setUserDetail(result);
      } catch (err) {
        console.error(err);
      }
    };

    saveUser();
  }, [user?.id, createUser]);

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserDetailContext.Provider>
  );
};

export default Provider;

export const userDetail = () => {
  return useContext(UserDetailContext);
};
