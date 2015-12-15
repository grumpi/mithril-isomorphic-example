'use strict';

var m = require('mithril');
var store = require('../../store');


function controller(params, done) {
  var scope = {};

  store.load('dog', 123).then(function(dog) {
    console.log(["the first dog is", dog]);
    scope.myDog = dog;
    store.load('dog', 12).then(function(dog) {
      console.log(["the second dog is", dog]);
      scope.mySecondDog = dog;

//      m.redraw();
      done && done(null, scope); 
    });
  });

  return scope;
}

function view(scope) {
  console.log(['evaluating view', scope]);
  return [
    m.trust('<!-- Server side rendering \\o/ -->'),
    m('h1', 'Ohh, another page'),
    m('p', "try to reload and look at the page's source code"),
    m('a', {
      href: '/',
      config: m.route
    }, 'back to home page'),
    m('p', scope.myDog && ("My dogs' names are " + scope.myDog.name + " and " + scope.mySecondDog.name) || '')
  ];
}

module.exports = {
  controller: controller,
  view: view
};
