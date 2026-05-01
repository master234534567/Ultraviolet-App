"use strict";

const stockSW = "/uv/uv.sw.js";
const swAllowedHostnames = ["localhost", "127.0.0.1"];

async function registerSW() {
  if (!navigator.serviceWorker) {
    if (
      location.protocol !== "https:" &&
      !swAllowedHostnames.includes(location.hostname)
    )
      throw new Error("Service workers cannot be registered without https.");

    throw new Error("Your browser doesn't support service workers.");
  }

  // Register the worker with the specific scope required by Ultraviolet
  await navigator.serviceWorker.register(stockSW, {
    scope: "/uv/service/",
  });
}

// We must call it here to ensure it's ready when the page loads
registerSW().catch(console.error);
