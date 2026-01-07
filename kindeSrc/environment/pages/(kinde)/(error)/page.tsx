'use server';

// Import necessary helpers from Kinde's infrastructure package.
// These are required to render widgets and styles correctly within Kinde's environment.
import { 
  getKindeWidget, 
  getKindeRequiredCSS,
  type KindePageEvent 
} from '@kinde/infrastructure';
import React from 'react';
import { renderToString } from 'react-dom/server.browser';

// The main page component. It receives the 'event' object containing context
// about the request (locale, widget data, etc.).
const ErrorPage: React.FC<KindePageEvent> = async ({ context, request }) => {
  // Extract dynamic content passed from Kinde, such as the page title.
  const { content } = context.widget;
  
  return (
    <html lang={request.locale.lang}>
      <head>
        <title>{content.pageTitle}</title>
        
        {/* Injects Kinde's base CSS. 
          This is crucial for ensuring Kinde widgets (like input fields or error text) 
          render with the correct baseline styles.
        */}
        {getKindeRequiredCSS()}
        
        {/* Your custom styling to override the look and feel */}
        <style>{`
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: #606060ff
          }
          .container {
            max-width: 500px;
            padding: 40px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          h1 {
            color: #606060ff;
            margin-bottom: 20px;
          }
        `}</style>
      </head>
      <body>
        {/* data-kinde-root="true" is required on the main container.
          This tells Kinde where the root of the application is for hydration/scripts.
        */}
        <div className="container" data-kinde-root="true">
          <h1>Oops! Something went wrong with this</h1>
          
          {/* Renders the dynamic Kinde widget. 
            In an error scenario, this will display the specific error message 
            returned by your workflow (e.g., the reason string from denyAccess).
          */}
          <div>{getKindeWidget()}</div>
          
          {/* The manual redirect workaround.
            Since the workflow cannot auto-redirect, this link allows the user 
            to return to your app manually.
          */}
          <a href="http://localhost:3000">Link text to go back</a>
        </div>
      </body>
    </html>
  );
};

// The default export must be an async function that renders the component to a string.
// Kinde expects a string return type for custom pages.
export default async function Page(event: KindePageEvent) {
  const page = await ErrorPage(event);
  return renderToString(page);
}