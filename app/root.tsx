import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "./tailwind.css?url";
import { Container } from "./common/container";

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

export const meta: MetaFunction = () => [{ title: "Cashfolio" }];

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
        <Container>
          <Outlet />
        </Container>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
