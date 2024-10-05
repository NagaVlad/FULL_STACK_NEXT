'use client'
import { ReactElement, useMemo, useState } from "react"
import { UserContext } from "@/contexts/user/context";
import { useCheckAuth } from "@/utils/swr";

export function UserContextProvider({ children }: { children: ReactElement }) {

   const { userData } = useCheckAuth()

   const contextValue = useMemo(() => ({ userData }), [userData])

   return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
}