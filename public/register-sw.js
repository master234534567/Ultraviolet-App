(async () => {
  if (!("serviceWorker" in navigator)) return;
  try {
    const reg = await navigator.serviceWorker.register("/uv/uv.sw.js", {
      scope: "/uv/service/",
      updateViaCache: "none",
    });
    if (reg.installing) {
      await new Promise((resolve) => {
        reg.installing.addEventListener("statechange", (e) => {
          if (e.target.state === "activated") resolve();
        });
      });
    }
    console.log("[Nebula] SW active");
  } catch (err) {
    console.warn("[Nebula] SW error:", err);
  }
})();
