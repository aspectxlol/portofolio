import { GeistSans } from "geist/font/sans";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { type BaseEditor } from "slate";
import { type ReactEditor } from "slate-react";
import Head from "next/head";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <title>aspectxlol</title>

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

type CustomElement = { type: 'paragraph' | 'code'; children: CustomText[] }
type CustomText = { text: string; bold?: true, italic?: true, underline?: true, strikeThrough?: true }


declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor 
    Element: CustomElement
    Text: CustomText
  }
}

export interface HistoryEditor extends BaseEditor {
  history: History
  undo: () => void
  redo: () => void
  writeHistory: (stack: 'undos' | 'redos', batch: unknown) => void
}