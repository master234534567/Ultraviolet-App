"use strict";

const form = document.getElementById("uv-form");
const address = document.getElementById("uv-address");
const searchEngine = document.getElementById("uv-search-engine");
const error = document.getElementById("uv-error");
const errorCode = document.getElementById("uv-error-code");

// Connect to the BareMux worker we will create in the build step
const connection = new BareMux.BareMuxConnection("/baremux/worker.js");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
        await registerSW();
    } catch (err) {
        error.textContent = "Failed to register service worker.";
        errorCode.textContent = err.toString();
        throw err;
    }

    const url = search(address.value, searchEngine.value);
    let frame = document.getElementById("uv-frame");
    frame.style.display = "block";

    // Vercel cannot host Wisp. We MUST use an external server.
    const wispUrl = "wss://wisp.mercurywork.shop/";

    if ((await connection.getTransport()) !== "/epoxy/index.mjs") {
        await connection.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl }]);
    }

    frame.src = __uv$config.prefix + __uv$config.encodeUrl(url);
});
