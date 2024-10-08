import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import { NextUIProvider } from "@nextui-org/react";
import Nav from "./components/nav";
import Footer from "./components/footer";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body
      className="dark"
      >
        <NextUIProvider>
          <Nav />
          <main
          className="mx-auto max-w-7xl pt-1.5 pb-4 px-4 sm:px-4 lg:px-8"
          >
          {children}
          </main>
          <Footer />
          <ScrollRestoration />
          <Scripts />
        </NextUIProvider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
