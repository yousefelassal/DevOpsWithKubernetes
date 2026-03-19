import { createHashRouter, Outlet, RouterProvider } from "react-router";
import { Suspense, lazy } from "react";
import type { PropsWithChildren } from "react";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import clsx from "clsx";

import "./global.css";

const client = new QueryClient();

interface LayoutProps extends PropsWithChildren {
  className?: string;
}

const HomeComponent = lazy(() => import("./pages/Home"));

function LoadingComponent() {
  return <div>Loading...</div>;
}

function SuspenseWrapper() {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <Outlet />
    </Suspense>
  );
}

const router = createHashRouter([
  {
    Component: SuspenseWrapper,
    ErrorBoundary: () => <div>Error loading the page.</div>,
    children: [
      {
        path: "/",
        Component: HomeComponent,
      },
    ],
  },
]);

export default function App({ className }: LayoutProps) {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col justify-center items-center w-full min-h-screen">
          Loading...
        </div>
      }
    >
      <QueryClientProvider client={client}>
        <div
          className={clsx(
            "flex flex-col justify-center items-center w-full min-h-screen",
            className,
          )}
        >
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </Suspense>
  );
}
