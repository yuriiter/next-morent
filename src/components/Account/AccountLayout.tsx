import Head from "next/head";
import { Sidebar } from "../Sidebar";
import { Navigation } from "./Navigation";
import { PropsWithChildren } from "react";

export const AccountLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="with-sidebar">
        <Sidebar>
          <Navigation />
        </Sidebar>

        <div className="with-sidebar__content">
          <section className="container">{children}</section>
        </div>
      </div>
    </>
  );
};