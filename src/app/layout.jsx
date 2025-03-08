import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';

export default async function RootLayout({children}) 
{
  const messages = await getMessages();
  const locale = await getLocale();
  
  return (
    <html lang="en">
     <body>
     <NextIntlClientProvider messages={messages}>
          {children}
      </NextIntlClientProvider>
      </body>
    </html>
  );
}
