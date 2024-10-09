'use client'
import { useEffect, useMemo } from "react"
import { WSProviderProps, WSStateContext } from "./context";


export function WSProvider({ children, url }: WSProviderProps): JSX.Element {
   const wsInstance = useMemo(
      () => new WebSocket(`ws://localhost:5000/websockets`),
      []
   );
   // const wsInstance = useMemo(
   //    () => (typeof window != 'undefined' ? new WebSocket(`ws://localhost:5000/websockets`) : null),
   //    []
   // );

   useEffect(() => {
      return () => {
         wsInstance?.close();
      };
   }, []);

   return <WSStateContext.Provider value={wsInstance}>{children} </WSStateContext.Provider>;
}
