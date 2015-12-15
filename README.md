
## Extended mithril-isomorphic-example with Inlined Data in HTML

See https://github.com/StephanHoyer/mithril-isomorphic-example for how things work.

Reload the page on /second and see what happens (or rather, what does not happen).

## What is added in this version

* whenever the server accesses the store, the resulting data is collected with continuation-local-store (in store/server.js)
* the collected data is dumped into the HTML document rendered by the server (in server/web.js)
* the inline JavaScript code in the generated HTML document unescapes and parses the request data and assigns it to a global variable.
* on the client side, the store looks for data that was inlined into the HTML document and tries to use that instead of making a request (in store/client.js)

It's really just an idea/example of how things could work in an isomorphic mithril app. You'd definitely want to use a real caching layer instead of a global variable in reality. This is just to keep things short/simple.

I'm not even sure it really works. Maybe my assumptions on how continuation-local-storage work are wrong and maybe things just work for this example. So tread carefully.
