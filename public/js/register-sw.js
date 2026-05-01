(async () => {
  if (!("serviceWorker" in navigator)) return;
  try {
    await navigator.serviceWorker.register("/uv/uv.sw.js", {
      scope: "/uv/service/",
      updateViaCache: "none",
    });
    console.log("[Nebula] SW active");
  } catch (err) {
    console.warn("[Nebula] SW error:", err);
  }
})();
