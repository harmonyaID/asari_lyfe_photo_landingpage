import { ReactNode } from "react";

export type NotifyFunction = (message: ReactNode, timeout?: number) => void