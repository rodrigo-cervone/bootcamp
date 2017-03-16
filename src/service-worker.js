/**
 * Check out https://googlechrome.github.io/sw-toolbox/docs/master/index.html for
 * more info on how to use sw-toolbox to custom configure your service worker.
 */


'use strict';
importScripts('./build/sw-toolbox.js');

self.toolbox.options.cache = {
  name: 'bootcamp-cache',
  maxAgeSeconds: 60 * 60 * 24 // a day
};

// pre-cache our key assets
self.toolbox.precache(
  [
    './build/main.js',
    './build/main.css',
    './build/polyfills.js',
    'index.html',
    'manifest.json'
  ]
);

// dynamically cache any other local assets
self.toolbox.router.any('/*', self.toolbox.cacheFirst);

// for any other requests:
// Request the resource from both the cache and the network in parallel. Respond with whichever returns first
// (usually cache, but then updates the cache with the response from the network).
self.toolbox.router.default = self.toolbox.fastest;