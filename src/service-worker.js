/* eslint-disable no-restricted-globals */

import { clientsClaim } from "workbox-core";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

clientsClaim();

const urls = self.__WB_MANIFEST.map(({ url }) =>
    url === "/index.html" ? "/" : url
);

const strategy = new StaleWhileRevalidate();

self.addEventListener("install", (event) => {
    event.waitUntil(
        new Promise(async (resolve, reject) => {
            const [manifestResponse, manifestDone] = strategy.handleAll({
                event,
                request: new Request("/manifest.json"),
            });

            const manifest = await (await manifestResponse).json();

            const otherDones = [
                ...(manifest.icons ?? []).map(({ src }) => src),
                ...urls,
            ].map(
                (path) =>
                    strategy.handleAll({
                        event,
                        request: new Request(path),
                    })[1]
            );

            Promise.all([manifestDone, ...otherDones]).then(resolve, reject);
        })
    );
});

self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});

registerRoute(
    ({ sameOrigin, url }) =>
        sameOrigin && url.pathname !== "/service-worker.js",
    strategy
);
