// Upgrade only an existing copy of this portfolio's old service worker.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        const worker = registration.active;
        if (worker && worker.scriptURL === new URL("/service-worker.js", location.origin).href) {
          await registration.update();
        }
      }
    } catch { /* Service workers may be unavailable in private browsing. */ }
  });
}
