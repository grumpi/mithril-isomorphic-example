
## Extended mithril-isomorphic-example with Inlined Data in HTML

See https://github.com/StephanHoyer/mithril-isomorphic-example for how things work.

Reload the page on /second and see what happens (or rather, what does not happen).

## Why?

Think of people loading a largeish, content-heavy mithril app on a slow mobile connection. Instead of having a new user (who most likely followed some link and is expecting to see content) wait until the whole app loaded, it would be nice if they could view the content while the app loads.

In this scenario, the DOM-refresh that mithril will do when it starts up isn't a problem at all - however, the app fetching content again could be. When content changes frequently, it is quite irritating to unexpectedly see content being swapped out for different content.

## What is added in this version

* we open a local context with continuation-local-storage (in server/web.js)
* whenever the server accesses the store, the resulting data is recorded to the local context (in store/server.js)
* the collected data from the local context is dumped into the HTML document rendered by the server (in server/web.js)
* the inline JavaScript code in the generated HTML document unescapes and parses the inlined data and assigns it to a global variable.
* on the client, the store looks for data that was inlined into the HTML document and tries to use that instead of making a request (in store/client.js)

It's really just an idea/example of how things could work in an isomorphic mithril app. You'd definitely want to use a real caching layer instead of a global variable in reality. This is just to keep things short/simple.
