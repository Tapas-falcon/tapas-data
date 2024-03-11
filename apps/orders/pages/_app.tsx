import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { NextIntlClientProvider } from "next-intl";
import { RecoilRoot } from "recoil";
import { AnimatePresence } from "framer-motion";
import { unstable_noStore as noStore } from 'next/cache'


import ThemeProvider from "@/components/ThemeProvider";
import { ConfirmProvider } from "@tapas/ui/Confirm";
import Layout from "@/components/Layout";

import "animate.css";
import "@/styles/tailwind-global.css";
import '@/styles/i-css.css';
// import '@tapas/ui/styles.css'  // 配置这个是使用ui自身tailwind编译的结果，开发时需要同时跑ui的dev。 目前采取配置相对路径"../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}"的方式直接生效

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
  noStore();
  return (
    <ThemeProvider>
      <NextIntlClientProvider
        locale={router.locale}
        messages={pageProps.messages}
      >
        <RecoilRoot>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <ConfirmProvider>
            <AnimatePresence mode="wait" initial={false}>
              {getLayout(<Component {...pageProps} />)}
            </AnimatePresence>
            <div id="modal-root"/>
          </ConfirmProvider>
        </RecoilRoot>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
