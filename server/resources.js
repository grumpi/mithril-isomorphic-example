'use strict';

var getNamespace = require('continuation-local-storage').getNamespace;
var session = getNamespace('request-session');

var Promise = require('promise');

module.exports = {
  dog: {
    get: function(id) {
      if (id == 123) {
  
        return new Promise(function(resolve) {
          resolve({
            id: id,
            name: 'Dolly' + session.get('whoami')
          });
        });
      } else {
        return new Promise(function(resolve) {
          resolve({
            id: id,
            name: 'Molly <script>alert("Molly is evil!");</script>' + session.get('whoami')
          });
        });
      }
    }
  }
};
