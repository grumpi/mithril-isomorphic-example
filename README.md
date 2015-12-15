
## Extended mithril-isomorphic-example with Inlined Data in HTML

See https://github.com/StephanHoyer/mithril-isomorphic-example for how things work.

Reload the page on /second and see what happens (or rather, what does not happen).

## Why?

Think of people loading a largeish, content-heavy mithril app on a slow mobile connection. Instead of having a new user (who most likely followed some link and is expecting to see content) wait until the whole app loaded, it would be nice if they could view the content while the app loads.

In this scenario, the DOM-refresh that mithril will do when it starts up isn't a problem at all - however, the app fetching content again could be. When content changes frequently, it is quite irritating to suddenly see content being swapped out for different content.

That's the problem that embedding the content data in the server-rendered HTML document solves.

## What is added in this version

* whenever the server accesses the store, the resulting data is collected with continuation-local-store (in store/server.js)
* the collected data is dumped into the HTML document rendered by the server (in server/web.js)
* the inline JavaScript code in the generated HTML document unescapes and parses the request data and assigns it to a global variable.
* on the client side, the store looks for data that was inlined into the HTML document and tries to use that instead of making a request (in store/client.js)

It's really just an idea/example of how things could work in an isomorphic mithril app. You'd definitely want to use a real caching layer instead of a global variable in reality. This is just to keep things short/simple.

I'm not even sure it really works. Maybe my assumptions on how continuation-local-storage work are wrong and maybe things just work for this example. So tread carefully.
