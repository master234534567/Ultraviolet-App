"use strict";

const stockSW = "/uv/uv.sw.js"; // Fixed filename from sw.js to uv.sw.js
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

	// Added scope to match the default UV configuration
	await navigator.serviceWorker.register(stockSW, {
		scope: "/uv/service/",
	});
}

// Ensure the function actually runs when the page loads
registerSW();
