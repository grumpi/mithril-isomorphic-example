See https://github.com/StephanHoyer/mithril-isomorphic-example for how things work.


## What is added in this version

* request data is collected on the server with continuation-local-storage (in store/server.js)
* the collected request data is dumped into the HTML document rendered by the server (in server/web.js)
* the client side code looks for existing request data and tries to use that instead of making a request

It's really just an idea/example of how things could work in an isomorphic mithril app.

I'm not even sure it really works. Maybe my assumptions on how continuation-local-storage work are wrong and maybe things just work for this example. So tread carefully.
