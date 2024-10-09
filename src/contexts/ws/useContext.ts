'use client'
import { useContext } from "react"
import { WSStateContext } from "./context";

export function useWSContext() {
   const context = useContext(WSStateContext);

   if (context === undefined) {
      throw new Error('useWS must be used within a WSProvider');
   }

   return context;
}
