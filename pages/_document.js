import { Html, Head, Main, NextScript } from 'next/document';
import { BotIdClient } from 'botid/client';

export default function Document() {
  const protectedRoutes = [
    { path: '/api/detect', method: 'POST' },
  ];

  return (
    <Html>
      <Head>
        <BotIdClient protect={protectedRoutes} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
