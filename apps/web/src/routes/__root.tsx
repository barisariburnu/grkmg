import type { QueryClient } from "@tanstack/react-query";
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Header from "../components/Header.js";
import appCss from "../styles.css?url";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Header />
        {children}
        {import.meta.env.DEV ? <DevtoolsContainer /> : null}
        <Scripts />
      </body>
    </html>
  );
}

function DevtoolsContainer() {
  const [mods, setMods] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    Promise.all([
      import("@tanstack/react-devtools"),
      import("@tanstack/react-router-devtools"),
      import("../integrations/tanstack-query/devtools.js"),
    ]).then(([reactDevtools, routerDevtools, queryDevtools]) => {
      if (!mounted) return;
      setMods({
        TanStackDevtools: (reactDevtools as any).TanStackDevtools,
        TanStackRouterDevtoolsPanel: (routerDevtools as any)
          .TanStackRouterDevtoolsPanel,
        QueryDevtoolsPlugin: (queryDevtools as any).default,
      });
    });
    return () => {
      mounted = false;
    };
  }, []);

  if (!mods) return null;

  const Devtools = mods.TanStackDevtools as any;
  const RouterPanel = mods.TanStackRouterDevtoolsPanel as any;
  const QueryPlugin = mods.QueryDevtoolsPlugin as any;

  return (
    <Devtools
      config={{ position: "bottom-right" }}
      plugins={[
        { name: "Tanstack Router", render: <RouterPanel /> },
        QueryPlugin,
      ]}
    />
  );
}
