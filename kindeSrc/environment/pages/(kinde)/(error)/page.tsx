"use server";

import React from "react";
import { renderToString } from "react-dom/server.browser";
import {
  getKindeRequiredCSS,
  getKindeRequiredJS,
  getKindeNonce,
  getKindeWidget,
  getKindeCSRF,
  getLogoUrl,
  getSVGFaviconUrl,
  getFallbackFaviconUrl
} from "@kinde/infrastructure";
import type { KindePageEvent } from "@kinde/infrastructure";

const ErrorPage: React.FC<KindePageEvent> = async ({ request, context }) => {
  return (
    <html lang={request.locale.lang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="csrf-token" content={getKindeCSRF()} />
        <title>{context.widget.content.pageTitle}</title>
        <link rel="icon" href={getFallbackFaviconUrl()} sizes="48x48" />
        <link rel="icon" href={getSVGFaviconUrl()} type="image/svg+xml" />
        {getKindeRequiredCSS()}
        <style nonce={getKindeNonce()}>
          {`:root {
            --kinde-base-background-color: #f8f9fa;
            --kinde-base-color: #212529;
            --kinde-base-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            --kinde-button-primary-background-color: #0066cc;
            --kinde-button-primary-color: #ffffff;
            --kinde-card-border-radius: 12px;
            --kinde-button-border-radius: 8px;
          }
          
          body {
            margin: 0;
            padding: 0;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }
          
          .error-container {
            max-width: 500px;
            width: 100%;
            margin: 0 auto;
            padding: 2rem 1.5rem;
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 2rem;
          }
          
          .error-header {
            text-align: center;
            padding: 1rem 0;
          }
          
          .error-header img {
            max-width: 180px;
            height: auto;
          }
          
          .error-widget-wrapper {
            flex: 1;
            display: flex;
            align-items: center;
          }
          
          [data-kinde-card] {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          }
          
          [data-kinde-alert-banner] {
            border-left: 4px solid #dc3545;
          }
          
          .error-footer {
            text-align: center;
            padding: 1.5rem 0;
            color: #6c757d;
            font-size: 0.875rem;
          }
          
          .error-footer a {
            color: #0066cc;
            text-decoration: none;
          }
          
          .error-footer a:hover {
            text-decoration: underline;
          }
          
          @media (max-width: 640px) {
            .error-container {
              padding: 1.5rem 1rem;
            }
          }`}
        </style>
        {getKindeRequiredJS()}
      </head>
      <body>
        <div className="error-container">
          <header className="error-header">
            <img 
              src={getLogoUrl()} 
              alt={context.widget.content.logoAlt}
            />
          </header>
          <main className="error-widget-wrapper">
            {getKindeWidget()}
          </main>
          <footer className="error-footer">
            <p>
              Need help? <a href="mailto:support@yourdomain.com">Contact support but this is a trap</a>
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
};

export default ErrorPage;