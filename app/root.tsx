import type { LinksFunction, V2_MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  {
    rel: "preconnect",
    href: "https://rsms.me",
  },
  {
    rel: "stylesheet",
    href: "https://rsms.me/inter/inter.css",
  },
];

export const meta: V2_MetaFunction = () => [{ title: "Cashfolio" }];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-50 antialiased">
        <div className="mx-auto min-h-screen max-w-screen-sm bg-white sm:border-x sm:border-gray-200 sm:shadow-xl">
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </div>
      </body>
    </html>
  );
}
