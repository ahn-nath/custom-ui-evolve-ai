'use server';

import { getKindeWidget, type KindePageEvent } from '@kinde/infrastructure';
import React from 'react';
import { renderToString } from 'react-dom/server.browser';

const ErrorPage: React.FC<KindePageEvent> = async ({ context, request }) => {
  const { content } = context.widget;
  
  return (
    <html lang={request.locale.lang}>
      <head>
        <title>{content.pageTitle}</title>
        <style>{`
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: #f5f5f5;
          }
          .container {
            max-width: 500px;
            padding: 40px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          h1 {
            color: #e74c3c;
            margin-bottom: 20px;
          }
        `}</style>
      </head>
      <body>
        <div className="container" data-kinde-root="true">
          <h1>Oops! Something went wrong with this</h1>
          <div>{getKindeWidget()}</div>
          <a href="url">Link text to go back</a>
        </div>
      </body>
    </html>
  );
};

export default async function Page(event: KindePageEvent) {
  const page = await ErrorPage(event);
  return renderToString(page);
}