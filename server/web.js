'use strict';
var createNamespace = require('continuation-local-storage').createNamespace;
var session = createNamespace('request-session');
var html_escape = require('html-escape');

var express = require('express');
var routes = require('../client/routes');
var each = require('lodash').each;
var render = require('mithril-node-render');

var app = express();

function base(content, ajax_responses) {
  return [
    '<!doctype html>',
    '<html>',
    '<head>',
    '<title>isomorphic mithril application</title>',
    '<meta charset="utf-8">',
    '</head>',
    '<body>',
    content,
    '<script id="resources" type="application/json">', ajax_responses, "</script>",
    "<script>function html_unescape(input){ var e = document.createElement('div');  e.innerHTML = input;  return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;} var dataElement = document.getElementById('resources'); var jsonText = dataElement.textContent || dataElement.innerText; var initData = JSON.parse(html_unescape(jsonText)); console.log(['I discovered the following data:', initData]);</script>",
    '</body>',
    '<script src="/index.js"></script>',
    '</html>'
  ].join('');
}

each(routes, function(module, route) {
  app.get(route, function(req, res, next) {
    session.bindEmitter(req);
    session.bindEmitter(res);

    session.run(function () {
      session.set('resources', []);
      res.type('html');
      function send(scope) {
        var t = session.get('resources');
        // https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet#HTML_entity_encoding

        res.end(base(render(module.view(scope)), html_escape(JSON.stringify(t))));
        scope && scope.onunload && scope.onunload();
      }
      if (module.controller.length < 2) { //sync, response imedeatly
        return send(module.controller(req.params));
      }
      // async, call with callback
      return module.controller(req.params, function(err, scope) {
        if (err) {
          return next(err);
        }
        send(scope);
      });
    });
  });
});

module.exports = app;
