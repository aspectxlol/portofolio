import { GeistSans } from "geist/font/sans";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import Head from "next/head";
import { ThemeProvider } from "@/components/ThemeProvider";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </Head>
      <main>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
        >
          <SessionProvider session={session}>
            <div className={GeistSans.className}>
              <Component {...pageProps} />
            </div>
          </SessionProvider>
        </ThemeProvider>
      </main>
    </>
  );
};

export default api.withTRPC(MyApp);
