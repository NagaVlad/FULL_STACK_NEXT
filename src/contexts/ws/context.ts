'use client'
import { createContext, ReactNode } from 'react';

export type WSProviderProps = { children?: ReactNode; url?: string };

export const WSStateContext = createContext<WebSocket | null>(null);