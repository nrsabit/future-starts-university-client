import { ReactNode } from "react";

export type TRoute = {
  path: string;
  element: ReactNode;
};

export type TRoutePath = {
  name?: string;
  path?: string;
  element?: ReactNode;
  children?: TRoutePath[];
};

export type TSidebarItems = {
  key?: string;
  label: ReactNode;
  children?: TSidebarItems[];
} | undefined;
