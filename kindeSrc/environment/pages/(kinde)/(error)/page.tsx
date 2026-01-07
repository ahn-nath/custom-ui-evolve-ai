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
          
          h1 {
            color: #e74c3c;
            margin-bottom: 20px;
          }
        `}</style>
      </head>
      <body>
        <div className="container">
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