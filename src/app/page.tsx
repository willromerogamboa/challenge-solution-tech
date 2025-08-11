"use client";

import dynamic from "next/dynamic";

const AppContainer = dynamic(() => import("./app-container"), {
  ssr: false,
});

export default function AppPage() {
  return <AppContainer />;
}
