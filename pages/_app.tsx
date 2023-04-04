import '@/styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";

const inter = Inter({ subsets: ['latin'] });

const msalConfig = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_MSAL_CLIENT_ID!,
    authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_MSAL_TENANT_ID}`,
    redirectUri: process.env.NEXT_PUBLIC_MSAL_REDIRECT_URL!,
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

function App({ Component, pageProps }: AppProps<{}>) {
  return (
    <MsalProvider instance={msalInstance}>
      <div className={inter.className}>
        <Toaster />
        <Component {...pageProps} />
      </div>
    </MsalProvider>
  );
}

export default appWithTranslation(App);
