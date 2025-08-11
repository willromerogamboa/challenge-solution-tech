import("../../mocks/browser").then(({ worker }) => {
  worker.start({
    serviceWorker: { url: "/mockServiceWorker.js" },
    onUnhandledRequest(req, print) {
      const url = new URL(req.url);
      const isRSC = url.searchParams.has("_rsc");
      const isNextAsset = url.pathname.startsWith("/_next");

      if (isRSC || isNextAsset) {
        return;
      }

      print.warning();
    },
  });
});

export default function AppPageContainer() {
  return (
    <div className="p-8">
      <h1>Welcome to Solution Tech</h1>
      <p>Your one-stop platform for innovative tech solutions.</p>
    </div>
  );
}
