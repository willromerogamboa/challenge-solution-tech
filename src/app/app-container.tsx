import("../../mocks/browser").then(({ worker }) => {
  worker.start({ serviceWorker: { url: "/mockServiceWorker.js" } });
});

export default function AppContainer() {
  return (
    <div className="p-8">
      <h1>Welcome to Solution Tech</h1>
      <p>Your one-stop platform for innovative tech solutions.</p>
    </div>
  );
}
