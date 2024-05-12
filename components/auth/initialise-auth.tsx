"use client";
import useUser from "@/store/user-store";
import React from "react";

const InitialiseAuth = () => {
  const { fetchUser } = useUser();

  React.useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  return <></>;
};

export default InitialiseAuth;
