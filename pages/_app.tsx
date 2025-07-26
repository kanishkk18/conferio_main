import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import { Toaster } from 'react-hot-toast';
// import colors from 'tailwindcss/colors.js';
import type { AppPropsWithLayout } from 'types/index';
import mixpanel from 'mixpanel-browser';
import "../pages/globals.css";
import { useEffect } from 'react';
import env from '@/lib/env';
// import { Themer } from '@boxyhq/react-ui/shared';
import { AccountLayout } from '@/components/layouts';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import QueryProvider from 'contexts/query-provider';
import { NuqsAdapter } from 'nuqs/adapters/next/pages';
import BoardListContextProvider from 'store/BoardListContext';
// import { SocketProvider } from "../contexts/SocketContext";
import MusicProvider from '@/components/music-components/music-provider';
// import Player from './music/components/cards/player';
import { NextContext } from 'hooks/use-context';
// import { ModalProvider } from "@/components/chat-components/providers/modal-provider";
// import { SocketProvider } from "@/components/chat-components/providers/socket-provider";
// import { QueryProvider } from "@/components/providers/query-provider";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const { session, ...props } = pageProps;


  // Add mixpanel
  useEffect(() => {
    if (env.mixpanel.token) {
      mixpanel.init(env.mixpanel.token, {
        debug: true,
        ignore_dnt: true,
        track_pageview: true,
      });
    }
  }, []);

  const getLayout =
    Component.getLayout || ((page) => <AccountLayout>{page}</AccountLayout>);

  return (
    <>
      <SessionProvider session={session}>
       <QueryProvider>
        <NuqsAdapter>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange>
           <NextContext.Provider value={{ nextData: { id: "O94kBTtw", name: "Chuttamalle" } }}>
           <MusicProvider>
               <BoardListContextProvider> 
                {/* <SocketProvider> */}
                  {/* <ModalProvider /> */}
        <Toaster toastOptions={{ duration: 4000 }} />
          {getLayout(<Component {...props} />)}
            {/* <Player/> */}
         {/* </SocketProvider>  */}
         </BoardListContextProvider>
         </MusicProvider>
         </NextContext.Provider>
        </ThemeProvider>
      </NuqsAdapter>
        </QueryProvider>
      </SessionProvider>
    </>
  );
}

export default appWithTranslation<never>(MyApp);
