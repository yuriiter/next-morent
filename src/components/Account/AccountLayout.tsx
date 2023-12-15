import Head from "next/head";
import { Sidebar } from "../Sidebar";
import { Navigation } from "./Navigation";
import { ReactNode } from "react";
import { cn } from "@/utils";
import { useHideNavigation } from "../Layout/Navigation/useHideNavigation";

type AccountLayoutProps = {
  className?: string;
  children?: ReactNode;
};

export const AccountLayout = ({ children, className }: AccountLayoutProps) => {
  const [, navigationHeight] = useHideNavigation();
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={cn(["with-sidebar", "account", className])}
        style={{ height: `calc(100vh - ${navigationHeight}px)` }}
      >
        <Sidebar>
          <Navigation />
        </Sidebar>

        <div className="with-sidebar__content">
          <div className="container account__container">{children}</div>
        </div>
      </div>
    </>
  );
};
