"use client";

import dynamic from "next/dynamic";

const AppContainer = dynamic(() => import("./page-container"), {
  ssr: false,
});

export default function AppPage() {
  return <AppContainer />;
}
